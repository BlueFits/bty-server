const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, max: 32 },
    goals: [{ type: Schema.Types.ObjectId, ref: "Goal" }]
});

module.exports = mongoose.model("User", UserSchema);