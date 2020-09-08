import { Request, Response, Router } from "express";
import { injectable } from "inversify";
import { UserController } from "../controllers";
import { verifyToken } from "../utils/auth";

@injectable()
export class UserRouter {
  	public readonly router: Router;

	constructor(private userController: UserController) {
		this.router = Router({ strict: true });
		this.init();
	}

  	private init(): void {
		this.router.post("/create", this.userController.createUser);
		this.router.post("/authenticate", this.userController.authenticate);

		this.router.use(verifyToken)
		this.router.post("/:id", this.userController.updateUser);
  	}
}