import * as express from "express";
import * as bodyParser from "body-parser";
import { injectable } from "inversify";
import { MainRouter, UserRouter } from "./routers";
import * as path from "path";
import * as mongoose from "mongoose";


const PORT = process.env.API_PORT || 5000;
const MONGO_URI =
  process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017";

@injectable()
export class App {
	private _app: express.Application;
	constructor(
		private mainRouter: MainRouter,
		private userRouter: UserRouter
		) {
		this._app = express();
		this.config();
	}

	public get app(): express.Application {
		return this._app;
	}

	private config(): void {
		// support application/json
		this.app.use(bodyParser.json());
		//support application/x-www-form-urlencoded post data
		this.app.use(bodyParser.urlencoded({ extended: false }));
		//Initialize app routes
		this.initRoutes();

		// Serve static files
		this.app.use(express.static(path.join(__dirname, "../../frontend/build")));
		this.app.get("/*", (req: express.Request, res: express.Response) => {
			res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
		});

		// Connected to Mongo
		this.setupMongoose();
	}

	private initRoutes() {
		this.app.use("/api/", this.mainRouter.router);
		this.app.use("/api/users", this.userRouter.router);
	}

	private setupMongoose() {
		mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
		mongoose.connection.once("open", () => {
			console.info("Connected to Mongo via Mongoose");
		});
		mongoose.connection.on("error", err => {
			console.error("Unable to connect to Mongo via Mongoose", err);
		});
	}

	listen() {
		this.app.listen(PORT, () => {
			console.log("Chatbot API is listening on port " + PORT);
		});
	}
}