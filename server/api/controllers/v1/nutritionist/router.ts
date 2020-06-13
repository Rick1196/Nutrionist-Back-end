import express from 'express';
import Controller from './controller';
import { checkJwt } from '../../../middlewares/checkJwt';

export default express
    .Router()
    .get("/patients", [checkJwt], Controller.patients);