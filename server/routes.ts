import { Application } from "express";
import examplesRouter from "./api/controllers/examples/router";
import userRouter from "./api/controllers/v1/users/router";
import authRouter from "./api/controllers/v1/auth/router";
import miscRouter from "./api/controllers/v1/misc/router";
import scheduleRouter from "./api/controllers/v1/schedule/router";
import nutritionistRouter from "./api/controllers/v1/nutritionist/router";
import patientRouter from "./api/controllers/v1/patient/router";
export default function routes(app: Application): void {
  app.use("/api/v1/examples", examplesRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/misc", miscRouter);
  app.use("/api/v1/schedule", scheduleRouter);
  app.use("/api/v1/nutritionist", nutritionistRouter);
  app.use("/api/v1/patient", patientRouter);
}
