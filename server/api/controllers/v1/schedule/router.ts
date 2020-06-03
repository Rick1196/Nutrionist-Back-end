import express from 'express';
import Controller from './controller';
import {checkJwt} from '../../../middlewares/checkJwt';

export default express
.Router()
.post("/new-date",[checkJwt], Controller.createConsultation)
.post("/filter-by-range",[checkJwt],Controller.filterByRange);