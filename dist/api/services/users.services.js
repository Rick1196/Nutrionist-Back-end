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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../common/logger"));
const bcrypt = __importStar(require("bcryptjs"));
const users_1 = require("../models/users");
const nutrionists_1 = require("../models/nutrionists");
const nutritionist_service_1 = __importDefault(require("./nutritionist.service"));
const exception_1 = __importDefault(require("../exceptions/exception"));
class UsersService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("fetch all users");
            const users = (yield users_1.User.find(null, "-_id -__v").lean());
            return users;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`fetch user with id ${id}`);
            const user = (yield users_1.User.findOne({ user_id: id }).lean());
            logger_1.default.info(`fetch user ${user.citie}`);
            return user;
        });
    }
    getByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`fetch user with username ${username}`);
            const user = (yield users_1.User.findOne({ user_name: username }).lean());
            if (!user) {
                throw new exception_1.default({ username: "Usuario no encontrado" });
            }
            return user;
        });
    }
    getUsersByName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`fetch users with username ${username}`);
            const users = (yield users_1.User.find({ user_name: username }).lean());
            return users;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`create user with data ${data.user_name}`);
            let errors = yield this.validateUser(data);
            if (errors.length != 0) {
                throw new exception_1.default(errors);
            }
            const user = new users_1.User(data);
            user.password = this.hashPassword(user.password);
            const doc = (yield user.save());
            return doc;
        });
    }
    validateUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let errors = { user_name: '', phone: '', length: 0 };
                let byUser = yield users_1.User.findOne({ user_name: data.user_name });
                if (byUser != null) {
                    errors.user_name = 'User already taked';
                    errors.length = errors.length + Number.parseInt('1');
                }
                let byPhone = yield users_1.User.findOne({ phone: data.phone });
                if (byPhone != null) {
                    errors.phone = 'Phone already registered';
                    errors.length = errors.length + Number.parseInt('1');
                }
                return errors;
            }
            catch (error) {
                throw Error(error);
            }
        });
    }
    udpdate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`update user with id ${data._id}`);
            let id = data._id;
            delete data._id;
            const doc = (yield users_1.User.updateOne({ _id: id }, { $set: data }, { multi: true }).exec());
            return users_1.User.findById(id);
        });
    }
    updateNutritionistProfile(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (users_1.User.findOneAndUpdate(profile.user._id, profile.user));
                delete profile.user;
                profile.image = Buffer.from(profile.image, 'base64');
                yield (nutrionists_1.Nutritionist.findOneAndUpdate(profile._id, profile));
            }
            catch (error) {
                throw Error(error);
            }
        });
    }
    registerPatient(patient) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.create(patient.user);
                let nutritionistUser = yield this.getByUsername(patient.nutritionist);
                let nutritionist = yield nutritionist_service_1.default.getByUserId(nutritionistUser._id);
                nutritionist.patients.push(user._id);
                yield nutritionist_service_1.default.udpdate(nutritionist);
                return user;
            }
            catch (error) {
                throw new exception_1.default(error);
            }
        });
    }
    generateCode() {
        return Math.random().toString(36).toUpperCase().substring(2, 4).toUpperCase() + Math.random().toString(36).toUpperCase().substring(2, 4).toUpperCase();
    }
    hashPassword(password) {
        return bcrypt.hashSync(password, 8);
    }
    checkIfUnencryptedPasswordIsValid(unencryptedPassword, savedPassword) {
        return bcrypt.compareSync(unencryptedPassword, savedPassword);
    }
}
exports.UsersService = UsersService;
exports.default = new UsersService();
//# sourceMappingURL=users.services.js.map