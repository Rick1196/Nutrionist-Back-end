import l from "../../common/logger";

import { Nutritionist, INutritionist } from "../models/nutrionists";

export class NutrionistService {
    async create(data): Promise<INutritionist> {
        l.info(`create nutrionist with data ${data.user}`);
        const nut = new Nutritionist(data);
        const doc = (await nut.save()) as INutritionist;
        return doc;
    }

    async udpdate(data):Promise<INutritionist>{
        l.info(`update Nutritionist with id ${data._id}`);
        let id = data._id;
        delete data._id;
        const doc =(await Nutritionist.updateOne({_id:id}, {$set:data},{multi:true}).exec());
        return Nutritionist.findById(id);

    }

    async getByUserId(data): Promise<INutritionist>{
        l.info(`retrive Nutrititionist with id ${data}`);
        let _id = data._id;
        const doc = (await Nutritionist.findOne({user:_id}).populate('user'));
        return doc;
    }
}

export default new NutrionistService();
