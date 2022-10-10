import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import usersMiddleware from "./middleware/users.middleware";

//Controllers
import UserController from "./controller/user.controller";

export class UserRoutes extends CommonRoutesConfig{
    constructor(app: express.Application) {
        super(app, "UsersRoutes");
    }

    configureRoute(): express.Application {

        //Create and read
        this.app.route("/users")
        .get((req: express.Request, res: express.Response) => {
            res.status(201).send({ msg: "success" });
        })

        this.app.patch("/users/addLog", [
            usersMiddleware.isIDValid,
            usersMiddleware.validateUserExists,
            UserController.patchLog
        ])

        return this.app;
    }
};