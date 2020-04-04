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