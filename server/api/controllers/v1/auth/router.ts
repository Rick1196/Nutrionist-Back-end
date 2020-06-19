import express from "express";
import controller from "./controller";
export default express
  .Router()
  .post("/login", controller.login)
  .post("/register-nutritionist", controller.registerNutritionist)
  .get("/resend-code/:username", controller.sendVerficationCode)
  .get("/request-change/:username", controller.requestResetPassword)
  .get("/change-password/:username/:password/:code", controller.resetPassowrd)
  .post("/validate-user", controller.confirmUser);