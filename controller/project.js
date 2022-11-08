const express = require("express");
const mongoose = require("mongoose");

const mainRouter = express.Router();
const mainModel = mongoose.model("Project");
const userModel = mongoose.model("User");


module.exports.controllerFunction = function (app) {

    mainRouter.post("/readAll", async (req, res, next) => {
        mainModel.find(function (err, doc) {
            if (err) {
                return res.send(err);
            } else {
                res.send(doc);
            }
        });
    })

    mainRouter.post("/readOne/:id", async (req, res, next) => {
        mainModel.findById(req.params.id, function (err, doc) {
            if (err) {
                return res.send(err);
            } else {
                res.send(doc);
            }
        });
    });

    mainRouter.post("/create", async (req, res, next) => {
        mainModel.findByIdAndUpdate(req.body._id,
            req.body,
            { upsert: true, new: true },
            function (err, doc) {
                if (err) {
                    return res.send(err);
                } else if (doc) {
                    doc.team.map((user) => {
                        userModel.findByIdAndUpdate(user._id,
                            { $addToSet: { projects: doc._id } },
                            { upsert: true, new: true },
                            function (err, doc) {
                                if (err) {
                                    return res.send(err);
                                } else {
                                    doc.uDate = Date.now();
                                    doc.save();
                                }
                            });
                    })
                    res.send(doc);
                }
            });
    });

    mainRouter.post("/update/:id", async (req, res, next) => {
        mainModel.findByIdAndUpdate(req.params.id, req.body,
            { upsert: true, new: true },
            function (err, doc) {
                if (err) {
                    return res.send(err);
                } else {
                    doc.uDate = Date.now();
                    doc.save(function (err, newDoc) {
                        if (err) {
                            return res.send(err);
                        } else {
                            res.send(newDoc);
                        }
                    });
                }
            });
    });

    mainRouter.post("/delete/:id", async (req, res, next) => {
        mainModel.findByIdAndDelete(req.params.id, function (err, doc) {
            if (err) {
                return res.send(err);
            } else if (doc) {
                doc.team.map((user) => {
                    userModel.findByIdAndUpdate(user._id, { "$pull": { "projects": req.params.id } }, { new: true }, function (err, doc) {
                        console.log(doc);
                    });
                })
                res.send(doc);
            }
        });
    });

    app.use("/v1/project", mainRouter);
};
