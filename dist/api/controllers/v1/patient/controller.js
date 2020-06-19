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
const users_services_1 = __importDefault(require("../../../services/users.services"));
const mail_service_1 = __importDefault(require("../../../services/mail.service"));
const patients_service_1 = __importDefault(require("../../../services/patients.service"));
const nutritionist_service_1 = __importDefault(require("../../../services/nutritionist.service"));
const logger_1 = __importDefault(require("../../../../common/logger"));
class PatientController {
    registerPatient(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield users_services_1.default.create(req.body.user);
                let patient = yield patients_service_1.default.create(user._id, req.body.patient);
                yield nutritionist_service_1.default.addPatient(patient._id, req.body.nutritionist);
                const text = `<p>Verificar cuenta de paciente', <strong> Codigo de verificacion: </strong>${user.confirmation_code}</p>
            <p><strong>Nombre de usuario:</strong>${req.body.user.user_name}</p>
            <p><strong>Password:</strong>${req.body.user.password}</p>
            `;
                mail_service_1.default.sendMail(user.phone.toString(), 'Verficacion de cuenta de paciente', text);
                return res.json({ message: "Paciente dado de alta" }).status(200);
            }
            catch (err) {
                next(err);
            }
        });
    }
    updatePatient(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield patients_service_1.default.update(req.body);
                res.status(200).json({ message: 'Paciente actualizado exitosamente' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    myConsultations(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`Fetch schedule from patient ${req.params.username}`);
                const user = (yield patients_service_1.default.byUsername(req.params.username))._id;
                const docs = yield patients_service_1.default.getConsultations(user, req.query);
                res.status(200).json(docs);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.PatientController = PatientController;
exports.default = new PatientController();
//# sourceMappingURL=controller.js.map