import UsersService from "../../../services/users.services";
import { Request, Response, NextFunction } from "express";
import usersServices from "../../../services/users.services";
import l from "../../../../common/logger";
import * as jwt from "jsonwebtoken";
import config from '../../../../config/config';
export class Controller {
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
            { userId: user.user_id, username: user.user_name, userRole:user.role },
            config.jwtSecret,
            { expiresIn: "5h" }
        )

        res.status(200).json(token);

    }
}

export default new Controller();
