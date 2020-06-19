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
        const client = require('twilio')('ACb669a8681d8a3e728562a5cd09603973', 'f3beae52c1c140ba4531d5662c2dc29c');
        client.messages.create({
            from: '+12058756832',
            to: `+52${to}`,
            body: content
        }).then((messsage) => {
            logger_1.default.info(`Sended to ${to}`);
            console.log(messsage.sid);
        });
    }
}
exports.default = new GMailService();
//# sourceMappingURL=mail.service.js.map