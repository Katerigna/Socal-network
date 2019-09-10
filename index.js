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
    console.log("get user for: ", req.session.userId);
    db.getUser(req.session.userId)
        .then(result => {
            console.log("result from get user", result);
            res.json(result[0]);
        })
        .catch(err => {
            console.log("error on getting user", err);
        });
});

app.get("/api/user/:id", (req, res) => {
    console.log("request id from id", req.params.id, req.session.userId);
    if (req.params.id != req.session.userId) {
        db.getProfile(req.params.id)
            .then(result => {
                console.log("result from get other user", result);
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
    console.log(
        "request to change bio of id",
        req.body.bio,
        req.session.userId
    );

    db.addBio(req.body.bio, req.session.userId)
        .then(result => {
            console.log("response from db add bio", result[0]);
            res.json(result[0]);
        })
        .catch(err => {
            console.log("error on adding bio", err);
        });
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

//server
app.listen(8080, function() {
    console.log("I'm listening.");
});
