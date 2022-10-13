import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import WebController from "../controllers/webController";

class IndexRoutes extends CommonRoutesConfig  {

    constructor(name: string) {
        super(name, express.Router());
    }

    configureRoute() {

        this.router.route("/utils/email")
        .get()
        .post(WebController.collectEmail)
        .delete()
        .patch()
        .put()


        this.router.get('/', (req: express.Request, res: express.Response) => {
            res.render("home");
        });

    }

};

export default IndexRoutes;