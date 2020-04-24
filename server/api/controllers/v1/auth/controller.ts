import UsersService from "../../../services/users.services";
import { Request, Response, NextFunction } from "express";
import usersServices from "../../../services/users.services";
import nutritionistService from "../../../services/nutritionist.service";

import l from "../../../../common/logger";
import * as jwt from "jsonwebtoken";
import config from '../../../../config/config';
import { IUserModel } from "../../../models/users";
export class Controller {
    async registerNutritionist(req: Request, res: Response, next: NextFunction) {
        let {
            first_name, last_name, birth_date, gender, email, phone, countrie, state, citie, direction, card_id,
            image, user_name, password,role
        } = req.body;
        const user = {
            first_name: first_name, last_name: last_name, birth_date:birth_date, gender:gender, email:email, phone:phone, countrie:countrie, state:state, citie:citie, direction:direction,
            user_name:user_name, password:password,role:role
        };

        usersServices.create(user).then(data=>{
            const nutritionist = {
                card_id:card_id, image:Buffer.from(image,'base64'), user:data._id
            };
            nutritionistService.create(nutritionist).then(nut=>{
                return res.status(200).json(nut)
            }).catch(error=>{
                return res.status(500).json(error);
            })
        }).catch(error=>{
            return res.status(500).json(error);
        })        
    }

    async validateUser(req:Request, res:Response, next:NextFunction){
        let {user_name,confirmation_code} = req.body
        let user = await usersServices.getByUsername(user_name);
        l.info(user.confirmation_code + ' ' + confirmation_code)
        if(user.confirmation_code == confirmation_code){
            user.confirmed = true;
            user.status = 'confirmed';
            usersServices.udpdate(user).then(data=>{
                res.status(200).json(data);
            }).catch(error=>{
                res.status(500).json(error);
            })
        }else{
            user.confirmation_code = usersServices.generateCode();
            l.info(user.confirmation_code);
            usersServices.udpdate(user).then(done=>{
                res.status(200).json({message:"invalid code",user:done});
            }).catch(error=>{
                res.status(500).json(error);
            })
        }
    }



    async login(req: Request, res: Response, next: NextFunction) {
        let { user_name, password } = req.body;
        if (!(user_name && password)) {
            return res.status(400).json({ error: 'Please provide user and password' })
        }

        const user = await usersServices.getByUsername(user_name);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        if (!usersServices.checkIfUnencryptedPasswordIsValid(password, user.password)) {
            return res.status(401).json({ error: 'Wrong password' });
        }

        const token = jwt.sign(
            { userId: user.user_id, username: user.user_name, userRole: user.role },
            config.jwtSecret,
            { expiresIn: "5h" }
        )
        res.status(200).cookie("SESSIONID", token, { httpOnly: true, secure: true }).json({
            token: token,
            expiresIn: '18000',
            user: user_name
        });

    }
}

export default new Controller();
