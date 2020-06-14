import { Request, Response, NextFunction, query } from "express";
import PatientService from "../../../services/patients.service";
import usersServices from "../../../services/users.services";
import GMailService from "../../../services/mail.service";
import patientsService from "../../../services/patients.service";
import nutritionistService from "../../../services/nutritionist.service";
export class PatientController {
    async registerPatient(req: Request, res: Response, next: NextFunction) {
        try {
            let user = await usersServices.create(req.body.user);
            let patient = await patientsService.create(user._id, req.body.patient);
            let nutritionist = await nutritionistService.addPatient(patient._id, req.body.nutritionist);
            GMailService.sendMail(user.email, 'Verificar cuenta de paciente', `<strong>Codigo de verificacion:</strong>${user.confirmation_code}`)
            return res.json({ message: "Paciente dado de alta" }).status(200);
        } catch (err) {
            next(err);
        }
    }

}

export default new PatientController();