import debug from "debug";
import mongooseService from "../../common/services/mongoose.service";
import { PatchUserDto } from "../dto/patch.user.dto";
import { PutUserDto } from "../dto/put.user.dto";

const log = debug("app: users-dao");

class UsersDao {
    private Schema = mongooseService.getMongoose.Schema;
    private UserSchema = new this.Schema({
        email: { type: String, required: true, lowercase: true, max: 32 },
        password: { type: String, required: true, },
        goals: [{ type: this.Schema.Types.ObjectId, ref: "Goal" }],
        createdAt: { type: Date, default: Date.now },
        loggedAt: [{ type: Date }]
    });
    private User = mongooseService.getMongoose.model("Users", this.UserSchema);

    constructor() {
        log("Created new instance of UsersDao");
    }    

    async getUserByID(userID: string) {
        return this.User.findById(userID).exec();
    }

    async updateUserById(userID: string, userFields: PatchUserDto | PutUserDto) {
        const existingUser = await this.User.findByIdAndUpdate(
            userID,
            { $set: userFields },
            { new: true }
        ).exec();

        return existingUser;
    }
};

export default new UsersDao();