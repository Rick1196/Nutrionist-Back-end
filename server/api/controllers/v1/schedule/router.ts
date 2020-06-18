import express from 'express';
import Controller from './controller';
import { checkJwt } from '../../../middlewares/checkJwt';

export default express
    .Router()
    .post("/new-date", [checkJwt], Controller.createConsultation)
    .post("/put-date", [checkJwt], Controller.updateConsultation)
    .get("/filter-by-range", [checkJwt], Controller.filterByRange);