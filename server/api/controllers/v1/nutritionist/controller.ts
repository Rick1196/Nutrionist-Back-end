import { Request, Response, NextFunction } from "express";
import nutritionistService from "../../../services/nutritionist.service";
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

}

export default new Controller();