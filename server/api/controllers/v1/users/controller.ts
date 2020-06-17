import UsersService from "../../../services/users.services";
import { Request, Response, NextFunction } from "express";
import usersServices from "../../../services/users.services";
import l from "../../../../common/logger";
import nutritionistService from "../../../services/nutritionist.service";
import GMailService from "../../../services/mail.service";
export class Controller {
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const doc = await UsersService.getById(Number.parseInt(req.params.id));
            l.info(`Controller recive ${doc.user_name}`);
            if (doc) {
                return res.status(200).json(doc);
            }
            const errors = [{ message: "User not found" }];
            return res.status(404).json({ errors });
        } catch (error) {
            return next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const docs = await UsersService.getAll();
            return res.status(200).json(docs);
        } catch (error) {
            return next(error);
        }
    }

    async updateNutritionistProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const profile = req.body;
            await usersServices.updateNutritionistProfile(profile);
            return res.json({ message: "Perfil actualizado corrrectamente" }).status(200);
        } catch (error) {
            return next(error);
        }
    }

    async isVerified(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.params.user_name;
            l.info(`Verifiying if ${user} is verified`);
            const doc = await usersServices.getByUsername(user);
            if (doc) {
                return res.status(200).json({ verified: doc.confirmed });
            } else {
                return res.status(404);
            }
        } catch (error) {
            return next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const doc = await usersServices.create(req.body);
            l.info(`created ${doc.user_name}`);
            return res
                .status(200)
                .json(doc)
        } catch (error) {
            return next(error);
        }
    }

    async generateUsername(req: Request, res: Response, next: NextFunction) {
        try {
            let firstname = req.body.first_name.trim().split(' ');
            let lastname = req.body.last_name.trim().split(' ');
            let temp = ''
            lastname.forEach(s => {
                temp += String(s).slice(0, 1);
            });
            let s = (firstname.length > 1) ? String(firstname[1]).slice(0, 1) : '';
            let username = firstname[0] + s + temp;
            let users = await usersServices.getUsersByName(username);
            if (users.length > 0) {
                username += users.length;
            }
            return res.json({ user_name: username }).status(200);
        } catch (err) {
            next(err);
        }
    }
}

export default new Controller();

