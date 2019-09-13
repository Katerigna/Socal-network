const express = require("express");
const app = express();
const compression = require("compression");
const csurf = require("csurf");
const db = require("./utils/db");
const { hash, compare } = require("./utils/bc");
const s3 = require("./s3.js");
const config = require("./config.json");

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
app.use(
    require("cookie-session")({
        maxAge: 1000 * 60 * 60 * 24 * 385.25 * 1000,
        secret:
            process.env.NODE_ENV == "production"
                ? process.env.SESS_SECRET
                : require("./secrets.json").sessionSecret
    })
);

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
                    result[0].receiver_id == req.session.userId
                ) {
                    res.json("Outgoing friend request detected");
                }
                if (
                    result[0].accepted == false &&
                    result[0].receiver_id == req.params.id
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

app.post("/friends/add/:id", (req, res) => {
    db.addFriendRequest(req.session.userId, req.params.id)
        .then(result => {
            // console.log("adding friend request", result[0]);
            res.json("Friend request added");
        })
        .catch(err => {
            console.log("error on adding friend request", err);
        });
});

app.post("/friends/add/friend/:id", (req, res) => {
    db.addFriend(req.session.userId, req.params.id, "true")
        .then(result => {
            console.log("adding friend", result);
            res.json("Friend detected");
        })
        .catch(err => {
            console.log("error on adding friend request", err);
        });
});

app.post("/friends/delete/:id", (req, res) => {
    db.deleteFriendRequest(req.session.userId, req.params.id)
        .then(result => {
            console.log("deleting friend request", result);
            res.json("Friend request deleted");
        })
        .catch(err => {
            console.log("error on deleting friend request", err);
        });
});

app.get("/cute-animals.json", (req, res) => {
    // console.log("get cute an runs");
    res.json([
        {
            name: "wombat",
            cuteness: "super"
        },
        {
            name: "giraffe",
            cuteness: "extremely"
        },
        {
            name: "mouse",
            cuteness: "extraordinary"
        }
    ]);
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

//server
app.listen(8080, function() {
    console.log("I'm listening.");
});
