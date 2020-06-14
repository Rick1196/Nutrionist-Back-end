import l from "../../common/logger";

import { Nutritionist, INutritionist } from "../models/nutrionists";
import { User } from "../models/users";
import usersServices from "./users.services";
import { IPatient } from "../models/patients";

export class NutrionistService {
    async create(data): Promise<INutritionist> {
        l.info(`create nutrionist with data ${data.user}`);
        const nut = new Nutritionist(data);
        const doc = (await nut.save()) as INutritionist;
        return doc;
    }

    async udpdate(data): Promise<INutritionist> {
        l.info(`update Nutritionist with id ${data._id}`);
        let id = data._id;
        delete data._id;
        const doc = (await Nutritionist.updateOne({ _id: id }, { $set: data }, { multi: true }).exec());
        return Nutritionist.findById(id);

    }

    async addPatient(_id: string, nutritionist: string): Promise<INutritionist> {
        l.info(`Adding patient with id ${_id} to nutritionise ${nutritionist}`)
        const user = (await usersServices.getByUsername(nutritionist))._id;
        let nut = await this.getByUserId(user);
        nut.patients.push(_id);
        const doc = await this.udpdate(nut);
        return doc;
    }

    async getByUserId(data): Promise<INutritionist> {
        l.info(`retrive Nutrititionist with id ${data}`);
        let _id = data._id;
        const doc = (await Nutritionist.findOne({ user: _id }).populate('user'));
        return doc;
    }

    async filter(username: string, pagination: any, usersQ: any): Promise<any[]> {
        const user = (await usersServices.getByUsername(username))._id;
        let users = (await User.find(usersQ));
        users = users.map(x => x._id);
        const list = await Nutritionist.findOne({ user: user }, "patients").populate({ path: 'patients', options: pagination, match: { user: { $in: users } }, populate: { path: 'user' } });
        return list.patients;
    }
}

export default new NutrionistService();
