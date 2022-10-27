const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
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
});


mongoose.model("User", userSchema);