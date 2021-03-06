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
            '04cc9b3dd1afac140d54b365bbc9bf7f'
        );

        client.messages.create({
            from: '+12058756832',
            to: `+52${to}`,
            body: content
        }).then((messsage) => {
            l.info(`Sended to ${to}`)
            console.log(messsage.sid)
        }).catch(error => {
            console.log(error);

        })

    }
}

export default new GMailService();