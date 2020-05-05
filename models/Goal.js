const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
    goalName: { type: String, required: true },
    steps: [{ type: Schema.Types.ObjectId, ref: "Step" }],
    status: { type: String, required: true },
    startDate: { type: String, required: true },
    goalColor: { type: String, required: true }
});

module.exports = mongoose.model("Goal", GoalSchema);