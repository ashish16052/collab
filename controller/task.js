const express = require("express");
const mongoose = require("mongoose");

const mainRouter = express.Router();
const taskModel = mongoose.model("Task");
const projectModel = mongoose.model("Project");


module.exports.controllerFunction = function (app) {

    mainRouter.post("/readAll", async (req, res, next) => {
        taskModel.find(function (err, doc) {
            if (err) {
                return res.send(err);
            } else {
                res.send(doc);
            }
        });
    })

    mainRouter.post("/readProject/:id", async (req, res, next) => {
        taskModel.find({ projectId: req.params.id }, function (err, doc) {
            if (err) {
                return res.send(err);
            } else {
                res.send(doc);
            }
        });
    })

    mainRouter.post("/readOne/:id", async (req, res, next) => {
        taskModel.findById(req.params.id, function (err, doc) {
            if (err) {
                return res.send(err);
            } else {
                res.send(doc);
            }
        });
    });

    mainRouter.post("/create", async (req, res, next) => {
        taskModel.findByIdAndUpdate(req.body._id, req.body,
            { upsert: true, new: true },
            function (err, doc) {
                if (err) {
                    return res.send(err);
                } else if (doc) {
                    projectModel.findByIdAndUpdate(req.body.projectId,
                        { $addToSet: { task: doc._id } },
                        { upsert: true, new: true },
                        function (err, newdoc) {
                            if (err) {
                                return res.send(err);
                            } else {
                                newdoc.uDate = Date.now();
                                var unique = [...newdoc.tags, ...doc.tags]
                                newdoc.tags = [...new Set(unique.map((item) => { return item }))]
                                newdoc.save();
                                res.send(doc);
                            }
                        });
                }
            });
    });

    mainRouter.post("/update/:id", async (req, res, next) => {
        taskModel.findByIdAndUpdate(req.params.id, req.body,
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
        taskModel.findByIdAndDelete(req.params.id, function (err, doc) {
            if (err) {
                return res.send(err);
            } else {
                projectModel.findByIdAndUpdate(doc.projectId, { "$pull": { "task": req.params.id } }, { new: true }, function (err, newdoc) {
                    res.send(doc);
                });
            }
        });
    });

    app.use("/v1/task", mainRouter);
};
