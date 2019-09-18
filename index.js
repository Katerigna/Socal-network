const express = require("express");
const app = express();
const compression = require("compression");
const csurf = require("csurf");
const db = require("./utils/db");
const { hash, compare } = require("./utils/bc");
const s3 = require("./s3.js");
const config = require("./config.json");
const server = require("http").Server(app); //socket.io server
const io = require("socket.io")(server, { origins: "localhost:8080" }); //space separated list of origins we allow socket.io to use //myapp.heroku.com/*

//file upload boiler plate
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152 //ca. 2 MB
    }
});
//end of upload boiler plate

//compress
app.use(compression());

//get req.body
app.use(express.json());

//connect styles
app.use(express.static("./public"));

//cookies
// app.use(
//     require("cookie-session")({
//         maxAge: 1000 * 60 * 60 * 24 * 385.25 * 1000,
//         secret:
//             process.env.NODE_ENV == "production"
//                 ? process.env.SESS_SECRET
//                 : require("./secrets.json").sessionSecret
//     })
// );

const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret:
        process.env.NODE_ENV == "production"
            ? process.env.SESS_SECRET
            : require("./secrets.json").sessionSecret,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);

io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

//security
app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

//production or development
if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//routes

app.get("/", (req, res) => {
    res.redirect("/welcome");
});

app.post("/register", (req, res) => {
    hash(req.body.password).then(hash => {
        db.addUser(req.body.first, req.body.last, req.body.email, hash)
            .then(result => {
                req.session.userId = result.rows[0].id;
                res.json(result.rows[0]);
            })
            .catch(err => {
                console.log("error on adding user to db: ", err);
                res.json(err.detail);
            });
    });
});

app.post("/login", (req, res) => {
    db.getPassword(req.body.email).then(result => {
        compare(req.body.password, result[0].password)
            .then(match => {
                req.session.userId = result[0].id;
                res.json(req.session.userId);
            })
            .catch(err => {
                console.log("error on login", err);
            });
    });
});

app.get("/user", (req, res) => {
    db.getUser(req.session.userId)
        .then(result => {
            res.json(result[0]);
        })
        .catch(err => {
            console.log("error on getting user", err);
        });
});

app.get("/api/user/:id", (req, res) => {
    if (req.params.id != req.session.userId) {
        db.getProfile(req.params.id)
            .then(result => {
                if (result[0] == undefined) {
                    res.json("user doesn't exist");
                }
                res.json(result[0]);
            })
            .catch(err => {
                console.log("error on getting other user", err);
            });
    } else {
        res.json("own id!");
    }
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const url = config.s3Url + req.file.filename;

    db.addImage(url, req.session.userId).then(response => {
        res.json(response[0]);
    });
});

app.post("/bio", (req, res) => {
    db.addBio(req.body.bio, req.session.userId)
        .then(result => {
            res.json(result[0]);
        })
        .catch(err => {
            console.log("error on adding bio", err);
        });
});

app.get("/users.json/", (req, res) => {
    db.getLastUsers()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log("error on getting last users", err);
        });
});

app.get("/search/:name", (req, res) => {
    db.getSearchedUsers(req.params.name)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log("error on search users", err);
        });
});

app.get("/friends/:id", (req, res) => {
    // console.log("receiver_id", req.session.userId);
    // console.log("sender_id", req.params.id);

    db.getFriendStatus(req.session.userId, req.params.id)
        .then(result => {
            console.log("who's friends?", result);
            if (result[0]) {
                if (result[0].accepted == true) {
                    res.json("Friend detected");
                }
                if (
                    result[0].accepted == false &&
                    result[0].receiver_id == req.params.id
                ) {
                    res.json("Outgoing friend request detected");
                }
                if (
                    result[0].accepted == false &&
                    result[0].receiver_id == req.session.userId
                ) {
                    res.json("Incoming friend request detected");
                }
            } else {
                res.json("Total strangers");
            }
        })
        .catch(err => {
            console.log("error on who's friends", err);
        });
});

app.post("/friends/addrequest/:id", (req, res) => {
    db.addFriendRequest(req.params.id, req.session.userId)
        .then(result => {
            console.log("adding friend request", result);
            res.json("Friend request added");
        })
        .catch(err => {
            console.log("error on adding friend request", err);
        });
});

app.post("/friends/add/:id", (req, res) => {
    db.addFriend(req.session.userId, req.params.id)
        .then(result => {
            console.log("adding friend", result);
            res.json("Friend detected");
        })
        .catch(err => {
            console.log("error on adding friend request", err);
        });
});

app.post("/friends/delete/friend/:id", (req, res) => {
    db.deleteFriendRequest(req.session.userId, req.params.id)
        .then(result => {
            console.log("deleting friend request", result);
            res.json("Friend request deleted");
        })
        .catch(err => {
            console.log("error on deleting friend request", err);
        });
});

app.get("/friends-wannabes", (req, res) => {
    console.log("receiver_id", req.session.userId);

    db.getFriendsWannabes(req.session.userId)
        .then(result => {
            console.log("friends and wannabes", result);
            let filteredResult = result.filter(user => {
                if (req.session.userId != user.id) {
                    return user;
                }
            });
            res.json(filteredResult);
        })
        .catch(err => {
            console.log("error on getting friends and wannabes", err);
        });
});

app.get("*", function(req, res) {
    console.log("user id", req.session.userId);
    res.sendFile(__dirname + "/index.html");
});

//server
server.listen(8080, function() {
    console.log("I'm listening.");
});

const onlineUsers = {};

io.on("connection", function(socket) {
    console.log(`A socket with id ${socket.id} just connected`);
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    db.getChatMessages().then(result => {
        console.log("last 10 msg from db", result);
        io.emit("Last 10 messages", result);
    });

    const userId = socket.request.session.userId;

    onlineUsers[socket.id] = socket.request.session.userId; //for online list

    // socket.on("Last 10 messages", () => {
    //     db.getChatMessages().then(result => {
    //         console.log("last 10 msg from db", result);
    //         io.sockets.emit("Last 10 messages", result);
    //     });
    // });

    socket.on("My chat message", msg => {
        console.log("Message received", msg);
        db.addMessage(msg, userId)
            .then(result => {
                console.log(
                    "result from inserting new chat message into db",
                    result
                );
                io.sockets.emit("My chat message", result);
            })
            .catch(err => console.log("error on adding msg to db", err));
    });

    socket.on("disconnect", () => {
        delete onlineUsers[socket.id];
        console.log(`A socket with id ${socket.id} just disconnected`);
    });

    //db query to get last 10 chat messages
    //and the result is sent to chat:
    //io.sockets.emit(chatMessages, [array of chat messages]);
    //socket.on("new message", () => {
    //go and get all the info about the user db query and pass a user id to be stored in a variable (or just pass it)
    //add chat message to db //
    //could create a chat message object and send it Out
    //io.sockets.emit('new chat message')
    // })
});
