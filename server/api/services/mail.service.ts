import * as nodemailer from 'nodemailer';
import CustomException from '../exceptions/exception';
import l from "../../common/logger";

class GMailService {
    private _transporter: nodemailer.Transporter;
    constructor() {
        try {
            this._transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'ricardompp11@gmail.com', // generated ethereal user
                    pass: 'reinerlute11', // generated ethereal password
                }
            })
        }catch(error){
            throw Error(error);
        }
        
    }

    sendMail(to: string, subject: string, content: string) {
        let options = {
            from: 'ricardompp11@gmail.com',
            to: to,
            subject: subject,
            html: content
        }

        this._transporter.sendMail(
            options, (error, info) => {
                if (error) {
                    throw new CustomException(error);
                }
                l.info(`Message Sent ${info.response}`);
            });
    }
}

export default new GMailService();