const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectSchema = new Schema({
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
    team: {
        type: [
            {
                userId: String,
                role: String
            }
        ],
        default: []
    },
    task: {
        type: [
            {
                taskId: String,
                title: String,
                description: String,
                start: Date,
                end: Date,
                taskStatus: String,
                assign: String,
                tags: [String],
                subtask: [
                    {
                        subTaskTitle: String,
                        done: Boolean
                    }
                ]
            }
        ],
        default: []
    },
});


mongoose.model("Project", projectSchema);