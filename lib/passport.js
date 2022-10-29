const googleStrategy = require('passport-google-oauth20').Strategy
const passport = require("passport");
const mongoose = require("mongoose");
require("../model/User");
const mainModel = mongoose.model('User');

require("dotenv").config();

passport.use(new googleStrategy(
    {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        mainModel.findById(profile.id, function (err, doc) {
            if (err) {
                return console.log(err);
            } else if (!doc) {
                const newModel = new mainModel({
                    _id: profile.id,
                    name: profile.displayName,
                    profilePic: profile.photos[0].value,
                    email: profile.emails[0].value,
                    cDate: Date.now(),
                    uDate: Date.now()
                });

                newModel.save(function (err, doc) {
                    if (err)
                        return console.log(err);
                    else
                        console.log("Created new user");
                    return cb(err, doc);
                });
            }
            else {
                console.log("User Exist");
                return cb(err, doc);
            }
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});