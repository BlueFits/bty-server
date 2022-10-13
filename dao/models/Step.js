const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StepSchema = new Schema({
    stepName: { type: String, required: true },
    isComplete: { type: Boolean, default: false },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

module.exports = mongoose.model("Step", StepSchema);