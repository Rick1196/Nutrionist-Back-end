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
const logger_1 = __importDefault(require("../../common/logger"));
const users_1 = require("../models/users");
const patients_1 = require("../models/patients");
const exception_1 = __importDefault(require("../exceptions/exception"));
const schedule_1 = require("../models/schedule");
const date_fns_1 = require("date-fns");
class PatientService {
    create(user, patient) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Creating patient with user id ${user}`);
            let temp = {
                marital_status: patient.marital_status,
                ocupation: patient.ocupation,
                user: user
            };
            const pat = new patients_1.Patient(patient);
            pat.user = user;
            const doc = yield pat.save();
            return doc;
        });
    }
    update(dataBody) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = dataBody.user;
            const userId = user._id;
            delete user._id;
            delete dataBody.user;
            let patient = dataBody;
            const id = patient._id;
            delete patient._id;
            yield users_1.User.updateOne({ _id: userId }, { $set: user }, { multi: true }).exec();
            yield patients_1.Patient.updateOne({ _id: id }, { $set: patient }, { multi: true }).exec();
        });
    }
    byUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.User.findOne({ user_name: username });
            if (!user) {
                throw new exception_1.default({ message: 'Usuario no encontrado' });
            }
            return user;
        });
    }
    getConsultations(user, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let start = date_fns_1.startOfDay(new Date(data.start));
            let end = date_fns_1.endOfDay(new Date(data.end));
            let atended = data.atended;
            const patient = (yield patients_1.Patient.findOne({ user: user }))._id;
            const docs = yield schedule_1.Schedule.find({ patient_id: patient, atended: atended, start: { $gte: start }, end: { $lte: end } }).populate({ path: 'patient_id', populate: { path: 'user' } }).populate({ path: 'nutritionist_id', populate: { path: 'user' } });
            return docs;
        });
    }
}
exports.PatientService = PatientService;
exports.default = new PatientService();
//# sourceMappingURL=patients.service.js.map