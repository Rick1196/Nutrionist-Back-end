import l from "../../common/logger";
import * as bcrypt from "bcryptjs";
import { User, IUserModel } from "../models/users";
import { Nutritionist } from "../models/nutrionists";
import nutritionistService from "./nutritionist.service";
import CustomException from "../exceptions/exception";
import { NextFunction } from "express";
export class UsersService {
    async getAll(): Promise<IUserModel[]> {
        l.info("fetch all users");
        const users = (await User.find(
            null,
            "-_id -__v"
        ).lean()) as IUserModel[];
        return users;
    }

    async getById(id: number): Promise<IUserModel> {
        l.info(`fetch user with id ${id}`);
        const user = (await User.findOne(
            { user_id: id }
        ).lean()) as IUserModel;
        l.info(`fetch user ${user.citie}`);
        return user;
    }

    async getByUsername(username: string): Promise<IUserModel> {
        l.info(`fetch user with username ${username}`);
        const user = (await User.findOne(
            { user_name: username }
        ).lean()) as IUserModel;
        if (!user) {
            throw new CustomException({ username: "Usuario no encontrado" })
        }
        return user;
    }

    async getUsersByName(username: string): Promise<IUserModel[]> {
        l.info(`fetch users with username ${username}`);
        const users = (await User.find({ user_name: username }).lean()) as IUserModel[];
        return users;
    }

    async create(data): Promise<IUserModel> {
        l.info(`create user with data ${data.user_name}`);
        let errors = await this.validateUser(data);
        if (errors.length != 0) {
            throw new CustomException(errors);
        }
        const user = new User(data);
        user.password = this.hashPassword(user.password);
        const doc = (await user.save()) as IUserModel;
        return doc;

    }

    async validateUser(data) {
        try {
            console.log(data);

            let errors = { user_name: '', phone: '', length: 0 };
            let byUser = await User.findOne({ user_name: data.username });
            if (byUser != null) {
                errors.user_name = 'User already taked';
                errors.length = errors.length + Number.parseInt('1');
            }
            // let byPhone = await User.findOne({ phone: data.phone });
            // if (byPhone != null) {
            //     errors.phone = 'Phone already registered';
            //     errors.length = errors.length + Number.parseInt('1');
            // }
            return errors;
        } catch (error) {
            throw Error(error);
        }

    }

    async udpdate(data): Promise<IUserModel> {
        l.info(`update user with id ${data._id}`);
        let id = data._id;
        delete data._id;
        const doc = (await User.updateOne({ _id: id }, { $set: data }, { multi: true }).exec());
        return User.findById(id);

    }

    async updateNutritionistProfile(profile: any) {
        try {
            await (User.findOneAndUpdate(profile.user._id, profile.user));
            delete profile.user;
            profile.image = Buffer.from(profile.image, 'base64');
            await (Nutritionist.findOneAndUpdate(profile._id, profile))
        } catch (error) {
            throw Error(error);
        }

    }

    async registerPatient(patient: any): Promise<IUserModel> {
        try {
            let user = await this.create(patient.user);
            let nutritionistUser = await this.getByUsername(patient.nutritionist);
            let nutritionist = await nutritionistService.getByUserId(nutritionistUser._id);
            nutritionist.patients.push(user._id);
            await nutritionistService.udpdate(nutritionist);
            return user;
        } catch (error) {
            throw new CustomException(error);
        }
    }

    async updateCode(username: string): Promise<IUserModel> {
        let user = await User.findOne({ user_name: username });
        if (!user) {
            throw new CustomException({ message: 'Usuario no encontrado' });
        }
        const _id = user._id;
        delete user._id;
        user.confirmation_code = this.generateCode();
        await User.updateOne({ _id: _id }, { $set: user }, { multi: true });
        const updated = await User.findOne({ _id: _id });
        return updated;
    }

    async changePassword(username: string, password: string, code: string) {
        let user = await User.findOne({ user_name: username });
        if (!user) {
            throw new CustomException({ message: 'Usuario no encontrado' });
        }
        if (user.confirmation_code === code) {
            const _id = user._id;
            delete user._id;
            user.password = this.hashPassword(password);
            const updated = await User.updateOne({ _id: _id }, { $set: user }, { multi: true });
            return updated;
        } else {
            throw new CustomException({ message: 'Codigo invalido' });
        }
    }


    public generateCode(): string {
        return Math.random().toString(36).toUpperCase().substring(2, 4).toUpperCase() + Math.random().toString(36).toUpperCase().substring(2, 4).toUpperCase();
    }

    private hashPassword(password: string): string {
        return bcrypt.hashSync(password, 8);
    }

    public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string, savedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, savedPassword);
    }
}


export default new UsersService();