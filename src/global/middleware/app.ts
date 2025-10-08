import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
let compression = require("compression");

export const applicationMiddlewares = (app: Application) => {
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.disable("x-powered-by");
};
