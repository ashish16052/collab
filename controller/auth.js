const express = require("express");
const passport = require("passport");
const mainRouter = express.Router();

module.exports.controllerFunction = function (app) {

    mainRouter.get('/loginStatus', (req, res) => {
        if (req.user) {
            res.send({ error: false, user: req.user })
        }
        else {
            res.send({ error: true, message: "Not authorised" });
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
