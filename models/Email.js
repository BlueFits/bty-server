const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
    email: { type: String, required: true },
    referrer: { type: String, default: "N/A" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Email", EmailSchema);