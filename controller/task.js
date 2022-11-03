const express = require("express");
const mongoose = require("mongoose");

const mainRouter = express.Router();
const mainModel = mongoose.model("Task");


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
        const newModel = new mainModel({
            _id: Date.now(),
            title: req.body.title,
            description: req.body.description,
            start: req.body.start,
            end: req.body.end,
            taskStatus: req.body.taskStatus,
            assign: req.body.assign,
            tags: req.body.tags,
            subtask: req.body.subtask,
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

    app.use("/v1/task", mainRouter);
};
