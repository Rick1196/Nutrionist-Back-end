import l from "../../common/logger";
import * as bcrypt from "bcryptjs";
import { User, IUserModel } from "../models/users";
import { IPatient, Patient } from "../models/patients";
import nutritionistService from "./nutritionist.service";
import CustomException from "../exceptions/exception";
import { NextFunction } from "express";
import usersServices from "./users.services";


export class PatientService {
    async create(user: string, patient: any) {
        l.info(`Creating patient with user id ${user}`)
        let temp = {
            marital_status: patient.marital_status,
            ocupation: patient.ocupation,
            user: user
        }
        const pat = new Patient(patient);
        pat.user = user;
        const doc = await pat.save();
        return doc;
    }

    async update(dataBody: any) {
        let user = dataBody.user;
        const userId = user._id;
        delete user._id;
        delete dataBody.user;
        let patient = dataBody;
        const id = patient._id;
        delete patient._id;
        await User.updateOne({ _id: userId }, { $set: user }, { multi: true }).exec();
        await Patient.updateOne({ _id: id }, { $set: patient }, { multi: true }).exec();
    }

}

export default new PatientService();