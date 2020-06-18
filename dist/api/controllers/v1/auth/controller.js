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
const users_services_1 = __importDefault(require("../../../services/users.services"));
const nutritionist_service_1 = __importDefault(require("../../../services/nutritionist.service"));
const mail_service_1 = __importDefault(require("../../../services/mail.service"));
const logger_1 = __importDefault(require("../../../../common/logger"));
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../../config/config"));
class Controller {
    registerNutritionist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { first_name, last_name, birth_date, gender, email, phone, countrie, state, citie, direction, image, user_name, password, role, data_type } = req.body;
            const user = {
                first_name: first_name, last_name: last_name, birth_date: birth_date, gender: gender, email: email, phone: phone, countrie: countrie, state: state, citie: citie, direction: direction,
                user_name: user_name, password: password, role: role
            };
            user.first_name = first_name.toString().toUpperCase();
            user.last_name = last_name.toString().toUpperCase();
            const errors = yield users_services_1.default.validateUser(user);
            if (errors.length != 0) {
                return res.status(400).json({ errors: errors });
            }
            users_services_1.default.create(user).then(data => {
                const nutritionist = {
                    image: Buffer.from(image, 'base64'), user: data._id, data_type: data_type
                };
                nutritionist_service_1.default.create(nutritionist).then(nut => {
                    mail_service_1.default.sendMail(data.phone.toString(), 'Verificar cuenta de nutriologo', `Codigo de verificacion:${data.confirmation_code}`);
                    return res.status(200).json(nut);
                }).catch(error => {
                    return res.status(500).json(error);
                });
            }).catch(error => {
                return res.status(500).json(error);
            });
        });
    }
    confirmUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { username, confirmation_code } = req.body;
            let user = yield users_services_1.default.getByUsername(username);
            logger_1.default.info(user.confirmation_code + ' ' + confirmation_code);
            if (user.confirmation_code == confirmation_code) {
                user.confirmed = true;
                user.status = 'confirmed';
                user.confirmation_code = users_services_1.default.generateCode();
                users_services_1.default.udpdate(user).then(data => {
                    res.status(200).json(data);
                }).catch(error => {
                    res.status(500).json(error);
                });
            }
            else {
                res.status(400).json({ message: "Codigo erroneo" });
            }
        });
    }
    sendVerficationCode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let username = req.params.username;
                let user = yield users_services_1.default.getByUsername(username);
                mail_service_1.default.sendMail(user.phone.toString(), 'Verificar cuenta de nutriologo', `Codigo de verificacion:${user.confirmation_code}`);
                return res.status(200).json({ message: "Hemos reenviado el codigo de verificacion" });
            }
            catch (err) {
                next(err);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { user_name, password } = req.body;
                if (!(user_name && password)) {
                    return res.status(400).json({ error: 'Please provide user and password' });
                }
                const user = yield users_services_1.default.getByUsername(user_name);
                if (user.confirmed == false) {
                    return res.status(400).json({ error: 'Debe verificar su usuario' });
                }
                if (!users_services_1.default.checkIfUnencryptedPasswordIsValid(password, user.password)) {
                    return res.status(401).json({ error: 'Password incorrecta' });
                }
                const token = jwt.sign({ userId: user.user_id, username: user.user_name, userRole: user.role }, config_1.default.jwtSecret, { expiresIn: "1y" });
                res.status(200).json({
                    token: token,
                    expiresIn: '18000',
                    user: user_name,
                    email: user.email,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.Controller = Controller;
exports.default = new Controller();
//# sourceMappingURL=controller.js.map