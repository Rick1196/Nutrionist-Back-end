import { Request, Response, NextFunction } from "express";
import scheduleServices from "../../../services/schedule.services";

class Controller {
    async createConsultation(req: Request, res: Response, next: NextFunction) {
        try {
            await scheduleServices.createConsultation(req.body);
            return res.status(200).json({ message: 'Consulta agendada' });
        } catch (err) {
            next(err);
        }
    }

    async updateConsultation(req: Request, res: Response, next: NextFunction) {
        try {
            scheduleServices.update(req.body);
            return res.status(200).json({ message: 'Consulta actualizada' });
        } catch (error) {
            next(error);
        }
    }

    async filterByRange(req: Request, res: Response, next: NextFunction) {
        try {
            const docs = await scheduleServices.getConsultationsByRange(req.query);
            return res.json(docs).status(200);
        } catch (err) {
            next(err);
        }
    }
}
export default new Controller();