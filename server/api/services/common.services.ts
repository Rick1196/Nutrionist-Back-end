import l from "../../common/logger";
import { Countrie } from "../models/countrie";


export class CommonService {
    async getCoutnries(): Promise<any> {
        l.info(`retriving all countries`);
        const docs = (await Countrie.find(null,
            "-_id -__v"
        ));
        return docs;
    }

}

export default new CommonService();
