require("dotenv").config();

const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

require("./database");

app.use(
    cors({
        origin: "http://localhost:3000", // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true, // allow session cookie from browser to pass through
    })
);

app.use(
    cookieSession({
        name: "session",
        keys: [keys.COOKIE_KEY],
        maxAge: 24 * 60 * 60 * 100,
    })
);

// parse cookies
app.use(cookieParser());

// initalize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

app.use(express.json());

const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

const spoolsRouter = require("./routes/spools");
app.use("/api/spools", spoolsRouter);

const statsRouter = require("./routes/statistics");
app.use("/api/statistics", statsRouter);

const countersRouter = require("./routes/counters");
app.use("/api/counters", countersRouter);

app.use(express.static(path.join(__dirname, "../backend/client/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../backend/client/build"));
});

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            authenticated: false,
            message: "user has not been authenticated",
        });
    } else {
        next();
    }
};

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.get("/", authCheck, (req, res) => {
    res.status(200).json({
        authenticated: true,
        message: "user successfully authenticated",
        user: req.user,
        cookies: req.cookies,
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server started"));
