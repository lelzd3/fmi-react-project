import { Request, Response, Router } from "express";
import { injectable } from "inversify";
import { MainController } from "../controllers/main.controller";

@injectable()
export class MainRouter {
    public readonly router: Router;

    constructor(private mainController: MainController) {
        this.router = Router({ strict: true });
        this.init();
    }

    private init(): void {
        this.router.get("/", this.mainController.rootURL);
    }
}