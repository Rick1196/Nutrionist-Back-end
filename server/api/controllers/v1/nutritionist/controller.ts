import { Request, Response, NextFunction } from "express";
import l from "../../../../common/logger";
import nutritionistService from "../../../services/nutritionist.service";
import usersServices from "../../../services/users.services";
export class Controller {

    async patients(req: Request, res: Response, next: NextFunction) {
        try {
            const username = req.query.username;
            const page = req.query.page;
            const size = req.query.size;
            const list = await nutritionistService.getMyPatients(username.toString(), Number(page.toString()), Number(size.toString()));
            return res.status(200).json(list);
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