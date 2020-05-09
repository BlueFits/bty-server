const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    taskDate: { type: String, required: true },
    tasksList: [{ type: String }],
    createdAt: { type: Date, required: true, default: Date.now, expires: 345600 }
});

module.exports = mongoose.model("Task", TaskSchema);