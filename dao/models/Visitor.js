const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisitorSchema = new Schema({
    ip: { type: String, default: "n/a" },
    country: { type: String, default: "n/a" },
    region: { type: String, default: "n/a" },
    timezone: { type: String, default: "n/a" },
    city: { type:String, default: "n/a" },
    eu: { type: Number, default: -1 },
    referrer: { type: String ,default: "n/a" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Visitor", VisitorSchema);