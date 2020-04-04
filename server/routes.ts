import { Application } from "express";
import examplesRouter from "./api/controllers/examples/router";
import userRouter from "./api/controllers/v1/users/router";
import authRouter from "./api/controllers/v1/auth/router";
export default function routes(app: Application): void {
  app.use("/api/v1/examples", examplesRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
}
