import mongoose, { Mongoose, mongo } from "mongoose";
import sequence from "mongoose-sequence";
const AutoIncrement = sequence(mongoose);
const schema = new mongoose.Schema(
    {},
    {
        collection: "countries"
    }
)
export const Countrie = mongoose.model<any>("countries",schema);