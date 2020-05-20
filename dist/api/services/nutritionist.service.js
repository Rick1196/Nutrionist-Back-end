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
const nutrionists_1 = require("../models/nutrionists");
class NutrionistService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`create nutrionist with data ${data.user}`);
            const nut = new nutrionists_1.Nutritionist(data);
            const doc = (yield nut.save());
            return doc;
        });
    }
    udpdate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`update Nutritionist with id ${data._id}`);
            let id = data._id;
            delete data._id;
            const doc = (yield nutrionists_1.Nutritionist.updateOne({ _id: id }, { $set: data }, { multi: true }).exec());
            return nutrionists_1.Nutritionist.findById(id);
        });
    }
    getByUserId(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`retrive Nutrititionist with user ${data.user_name}`);
            let _id = data._id;
            const doc = (yield nutrionists_1.Nutritionist.findOne({ user: _id }));
            return doc;
        });
    }
}
exports.NutrionistService = NutrionistService;
exports.default = new NutrionistService();
//# sourceMappingURL=nutritionist.service.js.map