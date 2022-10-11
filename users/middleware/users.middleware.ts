import express, { NextFunction } from "express";
import usersDao from "../daos/users.dao";
import mongooseService from "../../common/services/mongoose.service";

class UsersMiddleware {

    async isIDValid(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log("This is ", req.body.id);
        if (mongooseService.getMongoose.Types.ObjectId.isValid(req.body.id)) next();
        res.status(400).send({ error: "Not a valid id" });
    }

    async validateUserExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await usersDao.getUserByID(req.body.id);
        if (user) next();
        res.status(404).send({ error: `User ${req.body.id} not found` });
    }

    async extractUserID(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.id;
        next();
    }

};

export default new UsersMiddleware;