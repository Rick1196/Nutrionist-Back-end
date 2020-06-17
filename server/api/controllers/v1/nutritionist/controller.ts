import { Request, Response, NextFunction, response } from "express";
import l from "../../../../common/logger";
import nutritionistService from "../../../services/nutritionist.service";
import usersServices from "../../../services/users.services";
export class Controller {

    async getStatistics(req: Request, res: Response, next: NextFunction) {
        try {
            const females = (await nutritionistService.filter(req.params.username, {}, { gender: 'Mujer' })).patients.length;
            const males = (await nutritionistService.filter(req.params.username, {}, { gender: 'Hombre' })).patients.length;
            const others = (await nutritionistService.filter(req.params.username, {}, { gender: 'Otros' })).patients.length;
            const total = (await nutritionistService.filter(req.params.username, {}, {})).patients.length;
            return res.status(200).json({
                females: females,
                males: males,
                others: others,
                total: total
            });
        } catch (error) {
            next(error)
        }

    }

    async getByFullName(req: Request, res: Response, next: NextFunction) {
        try {
            const docs = await nutritionistService.getByFullName(String(req.query.firstname), String(req.query.lastname), String(req.query.username));
            return res.status(200).json(docs);
        } catch (error) {
            next(error);
        }
    }

    async patientsFilter(req: Request, res: Response, next: NextFunction) {
        try {
            let docs: any[];
            let pagination: { [k: string]: any } = {};
            let usersQ: { [k: string]: any } = {};
            let query: { [k: string]: any } = {};
            if (req.query.pagination == 'true') {
                pagination.sort = {};
                pagination.skip = Number(req.query.size) * (Number(req.query.page) - 1);
                pagination.limit = Number(req.query.size);
            }
            if (req.query.hasParams == 'true') {
                if (req.query.gender) {
                    usersQ.gender = req.query.gender;
                }
                if (req.query.username) {
                    usersQ.user_name = req.query.username;
                }
                if (req.query.phone) {
                    usersQ.phone = req.query.phone;
                }
                if (req.query.email) {
                    usersQ.email = req.query.email
                }
            }
            docs = await nutritionistService.filter(req.params.username, pagination, usersQ);
            return res.status(200).json(docs);
        } catch (error) {
            next(error);
        }

    }

    async profile(req: Request, res: Response, next: NextFunction) {
        try {
            l.info(`Contrller retriving nutritionist profile ${req.params.user_name}`);
            const user = await usersServices.getByUsername(req.params.user_name);
            if (user) {
                const nutritionist = await nutritionistService.getByUserId(user._id);
                if (nutritionist) {
                    return res.status(200).json(nutritionist);
                }
                const errors = [{ message: "Nutritionist not found" }];
                return res.status(400).json(errors);
            }
            const errors = [{ message: "User not found" }];
            return res.status(404).json({ errors });
        } catch (error) {
            return next(error);
        }
    }

}

export default new Controller();