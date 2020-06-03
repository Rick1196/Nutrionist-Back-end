"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = __importStar(require("nodemailer"));
const exception_1 = __importDefault(require("../exceptions/exception"));
const logger_1 = __importDefault(require("../../common/logger"));
class GMailService {
    constructor() {
        try {
            this._transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: 'ricardompp11@gmail.com',
                    pass: 'reinerlute11',
                }
            });
        }
        catch (error) {
            throw Error(error);
        }
    }
    sendMail(to, subject, content) {
        let options = {
            from: 'ricardompp11@gmail.com',
            to: to,
            subject: subject,
            html: content
        };
        this._transporter.sendMail(options, (error, info) => {
            if (error) {
                throw new exception_1.default(error);
            }
            logger_1.default.info(`Message Sent ${info.response}`);
        });
    }
}
exports.default = new GMailService();
//# sourceMappingURL=mail.service.js.map