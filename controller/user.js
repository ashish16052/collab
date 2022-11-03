const express = require("express");
const mongoose = require("mongoose");

const mainRouter = express.Router();
const mainModel = mongoose.model("User");


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

    mainRouter.post("/EmailToId", async (req, res, next) => {
        mainModel.findOne({ email: req.body.email }, function (err, doc) {
            if (err) {
                return res.send(err);
            } else {
                res.send(doc);
            }
        });
    });

    mainRouter.post("/create", async (req, res, next) => {
        const newModel = new mainModel({
            name: req.body.name,
            cDate: Date.now(),
            uDate: Date.now()
        });

        newModel.save(function (err, doc) {
            if (err) {
                return res.send(err);
            } else {
                res.send(doc)
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
            } else {
                res.send(doc);
            }
        });
    });

    app.use("/v1/user", mainRouter);
};
