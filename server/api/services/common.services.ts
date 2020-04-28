import l from "../../common/logger";
import { Countrie } from "../models/countrie";


export class CommonService {
    async getCoutnries(): Promise<any> {
        l.info(`retriving all countiries`);
        const docs = (await Countrie.find({}));
        return docs;
    }

}

export default new CommonService();
