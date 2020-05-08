import l from "../../common/logger";
import { Countrie } from "../models/countrie";


export class CommonService {
    async getCoutnries(): Promise<any> {
        l.info(`retriving all countiries`);
        const docs = (await Countrie.find(null,
            "-_id -__v"
          ).lean());
        return docs;
    }

}

export default new CommonService();
