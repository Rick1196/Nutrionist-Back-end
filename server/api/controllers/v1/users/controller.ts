import UsersService from "../../../services/users.services";
import { Request, Response, NextFunction } from "express";
import usersServices from "../../../services/users.services";
import l from "../../../../common/logger";

export class Controller {
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const doc = await UsersService.getById(Number.parseInt(req.params.id));
            l.info(`Controller recive ${doc.citie}`);
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
}

export default new Controller();

