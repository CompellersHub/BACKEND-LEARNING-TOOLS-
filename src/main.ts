import dotenv from "dotenv";
import express, { Application } from "express";
import path from "path";
import "reflect-metadata";
import { useContainer, useExpressServer } from "routing-controllers";
import { Container } from "typedi";
import { connection } from "./config";
import {
  applicationMiddlewares,
  authorizationChecker,
  currentUserChecker,
} from "./global/middleware";
import { registerAllModels } from "./register-models";
import { swaggerDocs } from "./swagger";
import { ScheduleRunner } from "./global/utils";
import { agenda, ScheduleService } from "./global/services";

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // You might want to log this to a monitoring service
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 4040;

applicationMiddlewares(app);
useContainer(Container);
registerAllModels();
useExpressServer(app, {
  routePrefix: "/api",
  validation: {
    whitelist: true,
    validationError: {
      target: false,
      value: false,
    },
    forbidNonWhitelisted: true,
    enableDebugMessages: true,
    skipMissingProperties: false,
  },
  defaultErrorHandler: false,
  development: true,
  classTransformer: true,
  controllers: [path.join(__dirname, "app/**/*.controller.{ts,js}")],
  middlewares: [path.join(__dirname, "global/**/*.middleware.{ts,js}")],
  authorizationChecker,
  currentUserChecker,
});

swaggerDocs(app, PORT);

(async () => {
  await connection();
  Container.get(ScheduleService);
  await agenda.start();
  await ScheduleRunner.runJob();
})();

app.listen(PORT);

async function graceful() {
  await agenda.stop();
  process.exit(0);
}

process.on("SIGTERM", graceful);
process.on("SIGINT", graceful);
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(1);
  // server.close(() => {
  //   console.log("Process terminated");
  // });
});
