import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import usersMiddleware from "./middleware/users.middleware";

//Controllers
import UserController from "./controller/user.controller";

class UserRoutes extends CommonRoutesConfig{
    constructor(name: string) {
        super(name, express.Router());
    }

    configureRoute(): void {

        //Create and read
        this.router.route("/")
        .get((req: express.Request, res: express.Response) => {
            res.status(201).send({ msg: "success" });
        })

        // this.router.patch("/users/addLog", [
        //     usersMiddleware.isIDValid,
        //     usersMiddleware.validateUserExists,
        //     UserController.patchLog
        // ])

        // this.router.param("id", usersMiddleware.extractUserID);

        // this.router.route("/users/fetch/:id")
        // .get(
        //     UserController.getUserByID
        // );

    }
};

export default UserRoutes;