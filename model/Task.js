const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = new Schema({
    _id: {
        type: String,
        default: Date.now(),
    },
    cDate: {
        type: Date,
        required: true,
    },
    uDate: {
        type: Date,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    projectId: {
        type: String,
    },
    start: {
        type: Date,
    },
    end:
    {
        type: Date,
    },
    taskStatus:
    {
        type: String,
        default: "to do"
    },
    assign: {
        type: [Object],
        default: [],
    },
    tags: {
        type: [String],
        default: [],
    },
});

mongoose.model("Task", taskSchema);