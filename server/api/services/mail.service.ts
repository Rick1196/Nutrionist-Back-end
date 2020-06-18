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
        } catch (error) {
            throw Error(error);
        }

    }

    sendMail(to: string, subject: string, content: string) {
        const client = require('twilio')(
            'ACb669a8681d8a3e728562a5cd09603973',
            'f3beae52c1c140ba4531d5662c2dc29c'
        );

        client.messages.create({
            from: '+12058756832',
            to: `+52${to}`,
            body: content
        }).then((messsage) => console.log(messsage.sid));

    }
}

export default new GMailService();