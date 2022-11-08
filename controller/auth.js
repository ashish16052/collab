const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const mainRouter = express.Router();
const userModel = mongoose.model("User");

module.exports.controllerFunction = function (app) {

    mainRouter.get('/loginStatus', (req, res) => {
        if (req.user) {
            userModel.findById(req.user._id, function (err, doc) {
                if (err) {
                    return res.send(err);
                } else {
                    res.send(doc)
                }
            });
        }
        else {
            res.send(null);
        }
    })

    mainRouter.get('/google', passport.authenticate('google',
        {
            scope: ['profile', 'email']
        }
    ));

    mainRouter.get('/google/callback', passport.authenticate('google',
        {
            successRedirect: process.env.CLIENT_URL + "/dashboard",
            failureRedirect: process.env.CLIENT_URL + "/auth",
            scope: ['profile', 'email'],
        }
    ));

    mainRouter.get('/logout', (req, res) => {
        req.logout(function (err) {
            if (err)
                return console.log(err);
            else
                res.redirect(process.env.CLIENT_URL);
        });
    })

    app.use("/auth", mainRouter);
};
