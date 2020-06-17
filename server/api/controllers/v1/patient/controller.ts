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
            await nutritionistService.addPatient(patient._id, req.body.nutritionist);
            const text = `<p>Verificar cuenta de paciente', <strong> Codigo de verificacion: </strong>${user.confirmation_code}</p>
            <p><strong>Nombre de usuario:</strong>${req.body.user.user_name}</p>
            <p><strong>Password:</strong>${req.body.user.password}</p>
            `;
            GMailService.sendMail(user.email, 'Verficacion de cuenta de paciente', text);
            return res.json({ message: "Paciente dado de alta" }).status(200);
        } catch (err) {
            next(err);
        }
    }

    async updatePatient(req: Request, res: Response, next: NextFunction) {
        try {
            await patientsService.update(req.body);
            res.status(200).json({ message: 'Paciente actualizado exitosamente' });
        } catch (error) {
            next(error);
        }
    }


}

export default new PatientController();