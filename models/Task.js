const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    taskDate: { type: String, required: true },
    taskList: [{ type: String }],
});

module.exports = mongoose.model("Task", TaskSchema);