import UsersService from "../../../services/users.services";
import { Request, Response, NextFunction, request } from "express";
import usersServices from "../../../services/users.services";
import nutritionistService from "../../../services/nutritionist.service";
import GMailService from "../../../services/mail.service";

import l from "../../../../common/logger";
import * as jwt from "jsonwebtoken";
import config from '../../../../config/config';
import { IUserModel, User } from "../../../models/users";
export class Controller {
    async registerNutritionist(req: Request, res: Response, next: NextFunction) {
        let {
            first_name, last_name, birth_date, gender, email, phone, countrie, state, citie, direction,
            image, user_name, password, role, data_type
        } = req.body;
        const user = {
            first_name: first_name, last_name: last_name, birth_date: birth_date, gender: gender, email: email, phone: phone, countrie: countrie, state: state, citie: citie, direction: direction,
            user_name: user_name, password: password, role: role
        };
        user.first_name = first_name.toString().toUpperCase();
        user.last_name = last_name.toString().toUpperCase();
        const errors = await usersServices.validateUser(user);
        if (errors.length != 0) {
            return res.status(400).json({ errors: errors });
        }
        usersServices.create(user).then(data => {
            const nutritionist = {
                image: Buffer.from(image, 'base64'), user: data._id, data_type: data_type
            };
            nutritionistService.create(nutritionist).then(nut => {
                GMailService.sendMail(data.email, 'Verificar cuenta de nutriologo', `<strong>Codigo de verificacion:</strong>${data.confirmation_code}`)
                return res.status(200).json(nut)
            }).catch(error => {
                return res.status(500).json(error);
            })
        }).catch(error => {
            return res.status(500).json(error);
        })
    }

    async confirmUser(req: Request, res: Response, next: NextFunction) {
        let { user_name, confirmation_code } = req.body
        let user = await usersServices.getByUsername(user_name);
        l.info(user.confirmation_code + ' ' + confirmation_code);
        if (user.confirmation_code == confirmation_code) {
            user.confirmed = true;
            user.status = 'confirmed';
            user.confirmation_code = usersServices.generateCode();
            usersServices.udpdate(user).then(data => {
                res.status(200).json(data);
            }).catch(error => {
                res.status(500).json(error);
            })
        } else {
            res.status(400).json({ message: "Codigo erroneo" });
        }
    }


    async sendVerficationCode(req: Request, res: Response, next: NextFunction) {
        try {
            let username = req.params.username;
            let user = await usersServices.getByUsername(username);
            GMailService.sendMail(user.email, 'Verificar cuenta de nutriologo', `<strong>Codigo de verificacion:</strong>${user.confirmation_code}`)
            return res.status(200).json({ message: "Hemos reenviado el codigo de verificacion" });
        } catch (err) {
            next(err);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            let { user_name, password } = req.body;
            if (!(user_name && password)) {
                return res.status(400).json({ error: 'Please provide user and password' })
            }

            const user = await usersServices.getByUsername(user_name);
            if (user.confirmed == false) {
                return res.status(400).json({ error: 'Debe verificar su usuario' });
            }

            if (!usersServices.checkIfUnencryptedPasswordIsValid(password, user.password)) {
                return res.status(401).json({ error: 'Password incorrecta' });
            }

            const token = jwt.sign(
                { userId: user.user_id, username: user.user_name, userRole: user.role },
                config.jwtSecret,
                { expiresIn: "1y" }
            )
            res.status(200).json({
                token: token,
                expiresIn: '18000',
                user: user_name,
                email: user.email,
            });
        } catch (err) {
            next(err);
        }


    }
}

export default new Controller();
