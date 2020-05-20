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
const users_services_2 = __importDefault(require("../../../services/users.services"));
const logger_1 = __importDefault(require("../../../../common/logger"));
const nutritionist_service_1 = __importDefault(require("../../../services/nutritionist.service"));
class Controller {
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield users_services_1.default.getById(Number.parseInt(req.params.id));
                logger_1.default.info(`Controller recive ${doc.citie}`);
                if (doc) {
                    return res.status(200).json(doc);
                }
                const errors = [{ message: "User not found" }];
                return res.status(404).json({ errors });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield users_services_1.default.getAll();
                return res.status(200).json(docs);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getNutritionistProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`Contrller retriving nutritionist profile`);
                const user = yield users_services_2.default.getByUsername(req.params.user_name);
                if (user) {
                    const nutritionist = yield nutritionist_service_1.default.getByUserId(user._id);
                    if (nutritionist) {
                        return res.status(200).json({ user: user, nutritionist: nutritionist });
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
    isVerified(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.params.user_name;
                logger_1.default.info(`Verifiying if ${user} is verified`);
                const doc = yield users_services_2.default.getByUsername(user);
                if (doc) {
                    return res.status(200).json({ verified: doc.confirmed });
                }
                else {
                    return res.status(404);
                }
            }
            catch (error) {
                return next(error);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield users_services_2.default.create(req.body);
                logger_1.default.info(`created ${doc.user_name}`);
                return res
                    .status(200)
                    .json(doc);
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