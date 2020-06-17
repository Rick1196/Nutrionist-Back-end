import express from "express";
import controller from "./controller";
import { checkJwt } from '../../../middlewares/checkJwt';
export default express
    .Router()
    .post("/update-patient", [checkJwt], controller.updatePatient)
    .post("/register-patient", [checkJwt], controller.registerPatient);

