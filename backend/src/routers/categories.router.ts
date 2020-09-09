import { Request, Response, Router } from "express";
import { injectable } from "inversify";
import { CategoriesController } from "../controllers";
import { verifyToken } from "../utils/auth";

@injectable()
export class CategoriesRouter {
  	public readonly router: Router;

	constructor(private categoriesController: CategoriesController) {
		this.router = Router({ strict: true });
		this.init();
	}

  	private init(): void {
		this.router.use(verifyToken)

		this.router.get("/", this.categoriesController.getAllCategoriesForAUser);
		this.router.post("/create", this.categoriesController.createCategory);
  	}
}