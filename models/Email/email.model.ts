import mongooseService from "../../common/services/mongoose.service";
const mongoose = mongooseService.getMongoose
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
    email: { type: String, required: true },
    referrer: { type: String, default: "N/A" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Email", EmailSchema);