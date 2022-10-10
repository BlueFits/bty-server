// var express = require('express');
const passport = require("passport");
const session = require("express-session");

import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import debug from "debug";


//Routes
import { UserRoutes } from "./users/users.routes.config";
import { CommonRoutesConfig } from "./common/common.routes.config";

const app: express.Application = express();
const port: number = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

//For Production
app.use(compression());
app.use(helmet());
//View Engine
app.set("view engine", "pug");
//Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//SESSION
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
}));

//PASSPORT CONFIG FOR ADMIN
// require("./config/passport")(passport);
// app.use(passport.initialize());
// app.use(passport.session());


//User route
routes.push(new UserRoutes(app));



const runningMessage = `Server running at http://localhost:${port}`;

app.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog("Routes configured for " + route.getName);
    });
    console.log(runningMessage);
});

/* Set url as a virtual in models when possible */