import l from "../../common/logger";
import { User, IUserModel } from "../models/users";
import { IPatient, Patient } from "../models/patients";
import CustomException from "../exceptions/exception";
import { Schedule } from "../models/schedule";
import { startOfDay, endOfDay } from "date-fns";


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

    async byUsername(username: string) {
        const user = await User.findOne({ user_name: username }) as IUserModel;
        if (!user) {
            throw new CustomException({ message: 'Usuario no encontrado' });
        }
        return user;
    }

    async getConsultations(user: string, data: any) {
        let start = startOfDay(new Date(data.start));
        let end = endOfDay(new Date(data.end));
        let atended = data.atended;
        const patient = (await Patient.findOne({ user: user }))._id;
        const docs = await Schedule.find({ patient_id: patient, atended: atended, start: { $gte: start }, end: { $lte: end } }).populate({ path: 'patient_id', populate: { path: 'user' } }).populate({ path: 'nutritionist_id', populate: { path: 'user' } })
        return docs;
    }

}

export default new PatientService();