import { Application, NextFunction, Request, Response } from "express";

export const generalErrorHandler = (app: Application) => {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
      error: {
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      },
    });
  });
};

export const unmatchedRoutes = (app: Application) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error(
      process.env.NODE_ENV === "development"
        ? "Unexpected route! Oh, you missed the road."
        : "Route not found"
    );
    (error as any).status = 404;
    next(error);
  });
};
