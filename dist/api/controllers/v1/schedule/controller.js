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
const schedule_services_1 = __importDefault(require("../../../services/schedule.services"));
class Controller {
    createConsultation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield schedule_services_1.default.createConsultation(req.body);
                return res.status(200).json({ message: 'Consulta agendada' });
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateConsultation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                schedule_services_1.default.update(req.body);
                return res.status(200).json({ message: 'Consulta actualizada' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    filterByRange(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield schedule_services_1.default.getConsultationsByRange(req.query);
                return res.json(docs).status(200);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new Controller();
//# sourceMappingURL=controller.js.map