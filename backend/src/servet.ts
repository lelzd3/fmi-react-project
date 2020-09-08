import "reflect-metadata";
import * as dotenv from "dotenv";
import { container } from "./inversify.config";

import { App } from "./app";

dotenv.config();

const application = container.get<App>(App);
application.listen();