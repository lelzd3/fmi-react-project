import { Request, Response, Router } from "express";
import { injectable } from "inversify";
import { PaymentsController } from "../controllers";
import { verifyToken } from "../utils/auth";

@injectable()
export class PaymentsRouter {
  	public readonly router: Router;

	constructor(private paymentsController: PaymentsController) {
		this.router = Router({ strict: true });
		this.init();
	}

  	private init(): void {
		this.router.use(verifyToken)

		this.router.get("/", this.paymentsController.getAllPaymentsForAUser);
		this.router.post("/create", this.paymentsController.createPayment);
		this.router.delete("/:id", this.paymentsController.deletePayment);
  	}
}