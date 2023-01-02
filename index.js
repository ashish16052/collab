const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require('express-session');
const passportSetup = require('./lib/passport');
const fs = require("fs");
require("dotenv").config();
const app = express();

var corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(
    express.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 1000000,
    })
);
app.set('trust proxy', 1);
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: process.env.SECRET,
        secure: true,
        httpOnly: false,
        sameSite: "none",
    }
}));
app.use(passport.initialize());
app.use(passport.session());

const connectDB = async () => {
    try {
        mongoose.connect(process.env.DB);
    } catch (error) {
        console.log(error);
    }
}

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server started at port: " + process.env.PORT);
    });
})

mongoose.connection.on("connected", () => {
    console.log("Connected to production database");
}).on("error", (err) => {
    console.log("Error in database connection" + err);
});

fs.readdirSync("./model").forEach(function (file) {
    require("./model/" + file);
});

fs.readdirSync("./controller").forEach(function (file) {
    if (file.indexOf(".js") !== -1) {
        var route = require("./controller/" + file);
        route.controllerFunction(app);
    }
});

