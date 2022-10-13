import mongoose from 'mongoose';
import { mongoDatabaseURL } from "./config/Server";

class MongooseService {

    private mongooseOptions = {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false,
    };

    constructor() {
        this.connectWithRetry();
    }

    get getMongoose() {
        return mongoose;
    }

    private connectWithRetry() {
        const mongoDB = process.env.MONGODB_URI || mongoDatabaseURL;
        mongoose.connect(mongoDB, this.mongooseOptions)
        .then(() => {
            console.log("connected to mongo (*_*)");
        })
        .catch((err) => {
            const connectInterval = 5;
            console.log(`connection unsuccessful will retry in ${connectInterval}s`);
            setTimeout(this.connectWithRetry, connectInterval * 1000);
        });
    }
}

export default new MongooseService();