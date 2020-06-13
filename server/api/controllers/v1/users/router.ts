import express from "express";
import controller from "./controller";
import { checkJwt } from '../../../middlewares/checkJwt';
export default express
  .Router()
  .post("/", controller.create)
  .get("/:id", controller.getById)
  .get("/is-verified/:user_name", controller.isVerified)
  .post("/update-nutritionist-profile", [checkJwt], controller.updateNutritionistProfile)
  .post("/generate-user", [checkJwt], controller.generateUsername);

