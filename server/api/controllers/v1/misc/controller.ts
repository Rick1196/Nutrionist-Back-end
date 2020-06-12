import { Request, Response, NextFunction } from "express";
import l from "../../../../common/logger";
import CommonServices from "../../../services/common.services";

export class Controller {
    async getCountries(req: Request, res:Response,nex:NextFunction){
        try{
            l.info("retriving countries");
            let countires = await CommonServices.getCoutnries();
            return res.status(200).json(countires);
        }catch(e){
            return res.status(500).json(e);
        }
    }
}

export default new Controller();