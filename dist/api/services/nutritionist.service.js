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
const users_1 = require("../models/users");
const users_services_1 = __importDefault(require("./users.services"));
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
    addPatient(_id, nutritionist) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Adding patient with id ${_id} to nutritionise ${nutritionist}`);
            const user = (yield users_services_1.default.getByUsername(nutritionist))._id;
            let nut = yield this.getByUserId(user);
            nut.patients.unshift(_id);
            const doc = yield this.udpdate(nut);
            return doc;
        });
    }
    getByUserId(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`retrive Nutrititionist with id ${data}`);
            let _id = data._id;
            const doc = (yield nutrionists_1.Nutritionist.findOne({ user: _id }).populate('user'));
            return doc;
        });
    }
    filter(username, pagination, usersQ) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield users_services_1.default.getByUsername(username))._id;
            const total = (yield (yield this.getByUserId(user)).patients.length);
            let users = (yield users_1.User.find(usersQ));
            users = users.map(x => x._id);
            const list = yield nutrionists_1.Nutritionist.findOne({ user: user }, "patients").populate({ path: 'patients', options: pagination, match: { user: { $in: users } }, populate: { path: 'user' } });
            return { patients: list.patients, total: total };
        });
    }
    getByFullName(firstname, lastname, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield users_services_1.default.getByUsername(username))._id;
            let patients = (yield (yield nutrionists_1.Nutritionist.findOne({ user: user }, "patients").populate({ path: "patients" })).patients);
            patients = patients.map(x => x.user);
            let query = {};
            query._id = { $in: patients };
            if (firstname != '') {
                query.first_name = new RegExp(`${firstname.toUpperCase()}`);
            }
            if (lastname != '') {
                query.last_name = new RegExp(`${lastname.toUpperCase()}`);
            }
            console.log(query);
            const users = yield users_1.User.find(query);
            return users;
        });
    }
}
exports.NutrionistService = NutrionistService;
exports.default = new NutrionistService();
//# sourceMappingURL=nutritionist.service.js.map