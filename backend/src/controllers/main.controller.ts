	
import { RequestHandler } from "express";
import { injectable } from "inversify";
import { Request, Response } from "express";

@injectable()
export class MainController {
	public rootURL = (req: Request, res: Response) => {
		return res.json({
			message: "Chatbot API is working!"
		});
	};
}