const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectSchema = new Schema({
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
    name: {
        type: String,
        required: true,
    },
    team: {
        type: [String],
        default: []
    },
    task: {
        type: [String],
        default: []
    },
});


mongoose.model("Project", projectSchema);