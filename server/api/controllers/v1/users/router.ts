import express from "express";
import controller from "./controller";
import { checkJwt } from '../../../middlewares/checkJwt';
export default express
  .Router()
  .post("/", controller.create)
  .get("/:id", controller.getById)
  .get("/get-nutritionist-profile/:user_name", [checkJwt], controller.getNutritionistProfile)
  .get("/is-verified/:user_name", controller.isVerified)
  .post("/update-nutritionist-profile", [checkJwt], controller.updateNutritionistProfile)
  .post("/register-patient", [checkJwt], controller.registerPatient)
  .post("/generate-user", [checkJwt], controller.generateUsername);

