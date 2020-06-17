
import { ISchedule, Schedule } from '../models/schedule';
import usersServices from './users.services';
import l from '../../common/logger';
import startOfDay from 'date-fns/startOfDay'
import endOfDay from 'date-fns/endOfDay'
import { Patient } from '../models/patients';
import { IUserModel } from '../models/users';

class ScheduleService {
    async createConsultation(data: any): Promise<ISchedule> {
        let nutritionist = await usersServices.getByUsername(data.nutritionist);
        delete data.nutritionist;
        let patient: any = (await Patient.findOne({ _id: data.patient_id }).populate({ path: 'user' }).select('user -_id').lean()).user;
        data.title = `Consulta con ${patient.first_name} ${patient.last_name}`;
        let input = data;
        input.nutritionist_id = nutritionist._id;
        data.start = new Date(data.start);
        data.end = new Date(data.start);
        const consultation = new Schedule(data);
        const doc = (await consultation.save()) as ISchedule;
        return doc;
    }

    async getConsultationsByRange(data: any): Promise<ISchedule[]> {
        let start = startOfDay(new Date(data.start));
        let end = endOfDay(new Date(data.end));
        let atended = data.atended;
        console.log('data', data);

        let nutritionist = (await usersServices.getByUsername(data.nutritionist))._id;
        const docs = await Schedule.find({ nutritionist_id: nutritionist, atended: atended, start: { $gte: start }, end: { $lte: end } }).populate({ path: 'patient_id', populate: { path: 'user' } })
        return docs;
    }
}

export default new ScheduleService();