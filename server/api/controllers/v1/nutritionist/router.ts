import express from 'express';
import Controller from './controller';
import { checkJwt } from '../../../middlewares/checkJwt';

export default express
    .Router()
    .get("/get-nutritionist-profile/:user_name", [checkJwt], Controller.profile)
    .get("/get-statistics/:username", [checkJwt], Controller.getStatistics)
    .get("/by-fullname", [checkJwt], Controller.getByFullName)
    .get("/patients/:username", [checkJwt], Controller.patientsFilter);