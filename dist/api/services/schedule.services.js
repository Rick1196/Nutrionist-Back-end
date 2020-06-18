"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schedule_1 = require("../models/schedule");
const users_services_1 = __importDefault(require("./users.services"));
const startOfDay_1 = __importDefault(require("date-fns/startOfDay"));
const endOfDay_1 = __importDefault(require("date-fns/endOfDay"));
const add_1 = __importDefault(require("date-fns/add"));
const patients_1 = require("../models/patients");
const exception_1 = __importDefault(require("../exceptions/exception"));
class ScheduleService {
    createConsultation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let nutritionist = yield users_services_1.default.getByUsername(data.nutritionist);
            delete data.nutritionist;
            let patient = (yield patients_1.Patient.findOne({ _id: data.patient_id }).populate({ path: 'user' }).select('user -_id').lean()).user;
            data.title = `Consulta con ${patient.first_name} ${patient.last_name}`;
            let input = data;
            input.nutritionist_id = nutritionist._id;
            data.start = new Date(data.start);
            data.end = add_1.default(new Date(data.start), { minutes: data.duration });
            data.allDay = false;
            const consultation = new schedule_1.Schedule(data);
            const docs = yield schedule_1.Schedule.find({ nutritionist_id: nutritionist._id, $or: [{ start: { $gt: data.start }, end: { $lt: data.end } }, { $and: [{ start: { $gt: data.start } }, { start: { $lt: data.end } }] }, { $and: [{ start: { $lt: data.start } }, { $and: [{ end: { $gt: data.start } }, { end: { $lt: data.end } },] }] }] });
            if (docs.length) {
                throw new exception_1.default({ overlap: 'Existen otras citas agendadas en el lapso de tiempo' });
            }
            const doc = (yield consultation.save());
            return doc;
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let date = yield schedule_1.Schedule.findOne({ _id: data._id }, "-_id").lean();
            date.end = add_1.default(new Date(data.start), { minutes: data.duration });
            date.start = data.start;
            date.patient_id = data.patient_id;
            date.duration = data.duration;
            date.color = data.color;
            yield schedule_1.Schedule.updateOne({ _id: data._id }, { $set: date }, { multi: true });
            return;
        });
    }
    getConsultationsByRange(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let start = startOfDay_1.default(new Date(data.start));
            let end = endOfDay_1.default(new Date(data.end));
            let atended = data.atended;
            console.log('data', data);
            let nutritionist = (yield users_services_1.default.getByUsername(data.nutritionist))._id;
            const docs = yield schedule_1.Schedule.find({ nutritionist_id: nutritionist, atended: atended, start: { $gte: start }, end: { $lte: end } }).populate({ path: 'patient_id', populate: { path: 'user' } });
            return docs;
        });
    }
}
exports.default = new ScheduleService();
//# sourceMappingURL=schedule.services.js.map