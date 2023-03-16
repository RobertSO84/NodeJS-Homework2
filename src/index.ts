import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

import { DB } from "./database/database";
import usersRouter from "./routes/users.routes";
import groupsRouter from "./routes/groups.routes";
import {
  errorHandler,
  logErrorsMiddleware,
  loggingMiddleware,
} from "./middleware/logginMiddleware";
import { logger } from "./utils/logger";

import { SERVER_PORT } from "../config";

export const app = express();
app.use(express.json());
app.use(loggingMiddleware);
app.use(errorHandler);
app.use(logErrorsMiddleware);

const PORT = SERVER_PORT;

process.on("uncaughtException", (error: Error) => {
  logger.error(error.message, error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
  logger.error(`Unhandled Rejection at: ${promise} reason: ${reason}`);
  process.exit(1);
});

async function main() {
  try {
    await DB.initDB();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();

app.use("/api/users", usersRouter);
app.use("/api/groups", groupsRouter);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
