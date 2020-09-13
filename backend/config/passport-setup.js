const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require("./keys");
const User = require("../models/user");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user);
        })
        .catch((e) => {
            done(new Error("Failed to deserialize the user."));
        });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.GOOGLE_CLIENT_ID,
            clientSecret: keys.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/api/auth/google/redirect",
        },
        async (token, tokenSecret, profile, done) => {
            User.findOne({ googleId: profile.id }).then((currentUser) => {
                if (currentUser) {
                    done(null, currentUser);
                } else {
                    // console.log(profile._json);
                    new User({
                        googleId: profile.id,
                        name: profile._json.name,
                        email: profile._json.email,
                        picture: profile._json.picture,
                    })
                        .save()
                        .then((newUser) => done(null, newUser));
                }
            });
        }
    )
);
