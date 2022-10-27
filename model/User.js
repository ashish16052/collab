const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: {
        type: String,
        default: Date.now(),
    },
    cDate: {
        type: Number,
        required: true,
    },
    uDate: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});


mongoose.model("User", userSchema);