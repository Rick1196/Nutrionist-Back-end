
import { ISchedule, Schedule } from '../models/schedule';
import usersServices from './users.services';
import startOfDay from 'date-fns/startOfDay'
import endOfDay from 'date-fns/endOfDay'
import add from 'date-fns/add';
import { Patient } from '../models/patients';
import l from '../../common/logger';
import CustomException from '../exceptions/exception';

class ScheduleService {
    async createConsultation(data: any): Promise<ISchedule> {
        let nutritionist = await usersServices.getByUsername(data.nutritionist);
        delete data.nutritionist;
        let patient: any = (await Patient.findOne({ _id: data.patient_id }).populate({ path: 'user' }).select('user -_id').lean()).user;
        data.title = `Consulta con ${patient.first_name} ${patient.last_name}`;
        let input = data;
        input.nutritionist_id = nutritionist._id;
        data.start = new Date(data.start);
        data.end = add(new Date(data.start), { minutes: data.duration });
        data.allDay = false;
        const consultation = new Schedule(data);
        const docs = await Schedule.find({ nutritionist_id: nutritionist._id, $or: [{ start: { $gt: data.start }, end: { $lt: data.end } }, { $and: [{ start: { $gt: data.start } }, { start: { $lt: data.end } }] }, { $and: [{ start: { $lt: data.start } }, { $and: [{ end: { $gt: data.start } }, { end: { $lt: data.end } },] }] }] });
        if (docs.length) {
            throw new CustomException({ overlap: 'Existen otras citas agendadas en el lapso de tiempo' });
        }
        const doc = (await consultation.save()) as ISchedule;
        return doc;
    }

    async update(data: any) {
        let date = await Schedule.findOne({ _id: data._id }, "-_id").lean();
        date.end = add(new Date(data.start), { minutes: data.duration });
        date.start = data.start;
        date.patient_id = data.patient_id;
        date.duration = data.duration;
        date.color = data.color;
        await Schedule.updateOne({ _id: data._id }, { $set: date }, { multi: true });
        return;
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