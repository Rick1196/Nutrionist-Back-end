import express from "express";
import controller from "./controller";
import {checkJwt} from '../../../middlewares/checkJwt';
export default express
  .Router()
  .post("/", controller.create)
  .get("/:id", controller.getById)
  .get("/",[checkJwt] ,controller.getAll);