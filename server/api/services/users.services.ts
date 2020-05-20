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

    async getByUsername(username: string): Promise<IUserModel> {
        l.info(`fetch user with username ${username}`);
        const user = (await User.findOne(
            { user_name: username }
        ).lean()) as IUserModel;
        return user;
    }

    async create(data): Promise<IUserModel> {
        l.info(`create user with data ${data.user_name}`);
        const user = new User(data);
        user.password = this.hashPassword(user.password);
        const doc = (await user.save()) as IUserModel;
        return doc;
    }

    async validateUser(data){
        let errors = {user_name:'',phone:'',length:0};
        let byUser = await User.findOne({user_name:data.user_name});
        if(byUser != null){
            errors.user_name = 'User already taked';
            errors.length = errors.length+ Number.parseInt('1');
        }
        let byPhone = await User.findOne({phone:data.phone});
        if(byPhone != null){
            errors.phone='Phone already registered';
            errors.length = errors.length+ Number.parseInt('1');

        }
        return errors;
    }

    async udpdate(data):Promise<IUserModel>{
        l.info(`update user with id ${data._id}`);
        let id = data._id;
        delete data._id;
        const doc =(await User.updateOne({_id:id}, {$set:data},{multi:true}).exec());
        return User.findById(id);

    }

    public generateCode():string{
        return Math.random().toString(36).toUpperCase().substring(2, 4).toUpperCase() + Math.random().toString(36).toUpperCase().substring(2, 4).toUpperCase();
    }

    private hashPassword(password:string):string {
        return  bcrypt.hashSync(password, 8);
    }
    
    public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string, savedPassword:string) {
        return bcrypt.compareSync(unencryptedPassword, savedPassword);
    }
}


export default new UsersService();