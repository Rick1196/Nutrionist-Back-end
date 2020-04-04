import mongoose from "mongoose";
import sequence from "mongoose-sequence";
const AutoIncrement = sequence(mongoose);

export interface INutritionist extends mongoose.Document {
    nutrionist_id: number;
    card_id:number;
    image:ImageBitmap;
    pacients:string[];
    user:string;
}


const schema = new mongoose.Schema(
    {
        nutrionist_id: { type: Number, unique: true },
        card_id: { type: String, },
        image: { type:  ImageBitmap},
        pacients: [{ type: mongoose.Schema.Types.ObjectId, ref:'users' }],
        user: {type: mongoose.Schema.Types.ObjectId, ref:'users', unique:true}
    },
    {
        collection: "nutrionists"
    }
);

schema.plugin(AutoIncrement, { inc_field: "nutrionist_id" });

export const User = mongoose.model<INutritionist>("Nutrionist", schema);
