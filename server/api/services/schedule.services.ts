
import { ISchedule, Schedule } from '../models/schedule';
import usersServices from './users.services';


class ScheduleService {
    async createConsultation(data: any): Promise<ISchedule> {
        let nutritionist = await usersServices.getByUsername(data.nutritionist);
        delete data.nutritionist;
        let input = data;
        input.nutritionist_id = nutritionist._id;
        const consultation = new Schedule(data);
        const doc = (await consultation.save()) as ISchedule;
        return doc;
    }

    async getConsultationsByRange(data: any): Promise<ISchedule[]> {
        let start = new Date(data.start);
        let end = new Date(data.end);
        let nutritionist = (await usersServices.getByUsername(data.nutritionist))._id;
        const docs = await Schedule.aggregate(
            [
                {$addFields:{"month":{$month:'$start'},"year":{$year:'$start'} }},
                {$match:{month:start.getMonth() + 1, year:start.getFullYear(),nutritionist_id:nutritionist}},
                {$lookup: {from: 'users', localField: 'patient_id', foreignField: '_id', as: 'patient'}} 
            ]
        )
        // const docs = await Schedule.aggregate().find({nutritionist_id:nutritionist}).populate('patient_id');
        return docs;
    }
}

export default new ScheduleService();