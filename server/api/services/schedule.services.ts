
import { ISchedule, Schedule } from '../models/schedule';
import usersServices from './users.services';
import l from '../../common/logger';
import startOfDay from 'date-fns/startOfDay'
import endOfDay from 'date-fns/endOfDay'

class ScheduleService {
    async createConsultation(data: any): Promise<ISchedule> {
        let nutritionist = await usersServices.getByUsername(data.nutritionist);
        delete data.nutritionist;
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
        console.log(start, end);

        let nutritionist = (await usersServices.getByUsername(data.nutritionist))._id;
        const docs = await Schedule.find({ nutritionist_id: nutritionist, start: { $gte: start }, end: { $lte: end } }).populate({ path: 'patient_id', populate: { path: 'user' } })
        return docs;
    }
}

export default new ScheduleService();