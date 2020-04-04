import { Request, Response, NextFunction } from "express";
import usersServices, {UsersService} from '../services/users.services';
import { User, IUserModel } from "../models/users";


export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //Get the user ID from previous midleware
        const id = res.locals.jwtPayload.userId;

        //Get user role from the database
        const user = await usersServices.getById(id);
        if(!user){
            return res.status(400).json({error:'User not found'});
        }

        //Check if array of authorized roles includes the user's role
        if (roles.indexOf(user.role) > -1) next();
        else res.status(401).send();
    };
};