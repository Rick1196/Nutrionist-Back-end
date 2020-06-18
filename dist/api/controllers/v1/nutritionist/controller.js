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
const logger_1 = __importDefault(require("../../../../common/logger"));
const nutritionist_service_1 = __importDefault(require("../../../services/nutritionist.service"));
const users_services_1 = __importDefault(require("../../../services/users.services"));
class Controller {
    getStatistics(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const females = (yield nutritionist_service_1.default.filter(req.params.username, {}, { gender: 'Mujer' })).patients.length;
                const males = (yield nutritionist_service_1.default.filter(req.params.username, {}, { gender: 'Hombre' })).patients.length;
                const others = (yield nutritionist_service_1.default.filter(req.params.username, {}, { gender: 'Otros' })).patients.length;
                const total = (yield nutritionist_service_1.default.filter(req.params.username, {}, {})).patients.length;
                return res.status(200).json({
                    females: females,
                    males: males,
                    others: others,
                    total: total
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getByFullName(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield nutritionist_service_1.default.getByFullName(String(req.query.firstname), String(req.query.lastname), String(req.query.username));
                return res.status(200).json(docs);
            }
            catch (error) {
                next(error);
            }
        });
    }
    patientsFilter(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let docs;
                let pagination = {};
                let usersQ = {};
                let query = {};
                if (req.query.pagination == 'true') {
                    pagination.sort = {};
                    pagination.skip = Number(req.query.size) * (Number(req.query.page) - 1);
                    pagination.limit = Number(req.query.size);
                }
                if (req.query.hasParams == 'true') {
                    if (req.query.gender) {
                        usersQ.gender = req.query.gender;
                    }
                    if (req.query.username) {
                        usersQ.user_name = req.query.username;
                    }
                    if (req.query.phone) {
                        usersQ.phone = req.query.phone;
                    }
                    if (req.query.email) {
                        usersQ.email = req.query.email;
                    }
                }
                docs = yield nutritionist_service_1.default.filter(req.params.username, pagination, usersQ);
                return res.status(200).json(docs);
            }
            catch (error) {
                next(error);
            }
        });
    }
    profile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`Contrller retriving nutritionist profile ${req.params.user_name}`);
                const user = yield users_services_1.default.getByUsername(req.params.user_name);
                if (user) {
                    const nutritionist = yield nutritionist_service_1.default.getByUserId(user._id);
                    if (nutritionist) {
                        return res.status(200).json(nutritionist);
                    }
                    const errors = [{ message: "Nutritionist not found" }];
                    return res.status(400).json(errors);
                }
                const errors = [{ message: "User not found" }];
                return res.status(404).json({ errors });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.Controller = Controller;
exports.default = new Controller();
//# sourceMappingURL=controller.js.map