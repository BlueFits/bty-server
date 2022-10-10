import express from "express";

export abstract class CommonRoutesConfig {
    protected name: string;
    protected app: express.Application; 

    constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name
        this.configureRoute();
    }

    abstract configureRoute(): express.Application;

    get getName() {
        return this.name;
    }

};