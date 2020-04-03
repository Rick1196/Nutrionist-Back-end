import l from "../../common/logger";
import * as bcrypt from "bcryptjs";
import { User, IUserModel } from "../models/users";

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

    async create(data: IUserModel): Promise<IUserModel> {
        l.info(`create user with data ${data.user_name}`);
        const user = new User(data);
        user.password = this.hashPassword(user.password);
        const doc = (await user.save()) as IUserModel;
        return doc;
    }

    private hashPassword(password:string):string {
        return  bcrypt.hashSync(password, 8);
    }
    
    private checkIfUnencryptedPasswordIsValid(unencryptedPassword: string, savedPassword:string) {
        return bcrypt.compareSync(unencryptedPassword, savedPassword);
    }
}


export default new UsersService();