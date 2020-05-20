import UsersService from "../../../services/users.services";
import { Request, Response, NextFunction } from "express";
import usersServices from "../../../services/users.services";
import l from "../../../../common/logger";
import nutritionistService from "../../../services/nutritionist.service";

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

    async getNutritionistProfile(req:Request, res: Response, next: NextFunction){
        try{
            l.info(`Contrller retriving nutritionist profile`);
            const user = await usersServices.getByUsername(req.params.user_name);
            if(user){
                const nutritionist = await nutritionistService.getByUserId(user._id);
                if(nutritionist){
                    return res.status(200).json({user:user,nutritionist:nutritionist});
                }
                const errors = [{message:"Nutritionist not found"}];
                return res.status(400).json(errors);
            }
            const errors = [{message:"User not found"}];
            return res.status(404).json({errors});
        }catch(error){
            return next(error);
        }
    }

    async isVerified(req:Request, res:Response, next:NextFunction){
        try{
            const user = req.params.user_name;
            l.info(`Verifiying if ${user} is verified`);
            const doc = await usersServices.getByUsername(user);
            if(doc){
                return res.status(200).json({verified:doc.confirmed});
            }else{
                return res.status(404);
            }
        }catch(error){
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

