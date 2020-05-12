const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, lowercase: true, max: 32 },
    password: { type: String, required: true, },
    goals: [{ type: Schema.Types.ObjectId, ref: "Goal" }],
    createdAt: { type: Date, default: Date.now },
    loggedAt: [{ type: Date }]
});

UserSchema.virtual("url").get(function() {
    return `information/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);