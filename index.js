const express = require("express");
const app = express();
const compression = require("compression");
const csurf = require("csurf");
const db = require("./utils/db");
const { hash, compare } = require("./utils/bc");

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
    console.log("request from post register: ", req.body);

    hash(req.body.password).then(hash => {
        db.addUser(req.body.first, req.body.last, req.body.email, hash)
            .then(result => {
                console.log("result from adding user to db: ", result.rows[0]);
                res.json(result.rows[0]);
                req.session.userId = result.rows[0].id;
                console.log("registered cookie: ", req.session.userId);
            })
            .catch(err => {
                console.log("error on adding user to db: ", err);
                res.json(err.detail);
            });
    });
});

app.post("/login", (req, res) => {
    console.log("login request: ", req.body);

    db.getPassword(req.body.email).then(result => {
        console.log("db response password", result);
        compare(req.body.password, result[0].password)
            .then(match => {
                console.log("did password match? ", match);
                req.session.userId = result[0].id;
                res.json(result[0].id);
            })
            .catch(err => {
                console.log("error on login", err);
            });
    });
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

//server
app.listen(8080, function() {
    console.log("I'm listening.");
});
