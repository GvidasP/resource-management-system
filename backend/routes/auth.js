const express = require("express");
const router = express.Router();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);
router.get("/login/success", (req, res) => {
    console.log(req.user);
    console.log("/login/success");
    if (req.user) {
        res.json({
            success: true,
            message: "User has successfully authenticated.",
            user: req.user,
            cookies: req.cookies,
        });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "User failed to authenticate.",
    });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_HOME_PAGE_URL);
});

router.get(
    "/google/redirect",
    passport.authenticate("google", {
        successRedirect: CLIENT_HOME_PAGE_URL,
        failureRedirect: "/auth/login/failed",
    })
);

module.exports = router;
