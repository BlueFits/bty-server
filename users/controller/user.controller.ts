import express from "express";
import debug from "debug";
import UsersDao from "../daos/users.dao";
import { PatchUserDto } from "../dto/patch.user.dto";

const log: debug.IDebugger = debug("app: users-controller");
class UserController {
    async patchLog(req: express.Request, res: express.Response) {

        const user = await UsersDao.getUserByID(req.body.userId)
        let update: PatchUserDto = {};

        if (user.loggedAt.length <= 4) {
            update = {
                loggedAt: [...user.loggedAt, new Date()],
            };
        } else {
            const newLoggedAt = [...user.loggedAt];
            newLoggedAt.shift();
            newLoggedAt.push(new Date());
            update = {
                loggedAt: newLoggedAt,
            };
        }

        const newUser = await UsersDao.updateUserById(
            req.body.userId, 
            update
        );

        res.status(204).send({ user: newUser })
    }

    async getUserByID(req: express.Request, res: express.Response) {
        const user = await UsersDao.getUserByID(req.body.id)
        res.status(200).send(user);
    }
};

export default new UserController;