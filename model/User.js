const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: {
        type: String,
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
    profilePic: {
        type: String,
    },
    email:{
        type: String,
    },
    subscription: {
        type: String,
        default: "free",
    }
});


mongoose.model("User", userSchema);