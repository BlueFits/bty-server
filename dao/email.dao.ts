import Email from "./models/Email";

class EmailDao {

    constructor() {
        console.log("Created Email DAO");
    }

    //CRUD OPERSATIOSN

    //CREATE
    async createEmail(email: string, referrer: unknown) {
        const emailInstance = new Email({
            email,
            referrer,
        });
        const createdEmail = await emailInstance.save().catch(err => err); 
        return createdEmail._id;
    }


};

export default new EmailDao;