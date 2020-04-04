import mongoose from "mongoose";
import sequence from "mongoose-sequence";
const AutoIncrement = sequence(mongoose);

export interface IPacient extends mongoose.Document {
    patient_id: number;
    marital_status:string;
    ocupation:string
    nutrionist:string;
    user:string;
}


const schema = new mongoose.Schema(
    {
        pacient_id: { type: Number, unique: true },
        marital_status: { type: String},
        ocupation: { type:  String},
        nutrionist: { type: mongoose.Schema.Types.ObjectId, ref:'nutrionists', unique:true },
        user: {type: mongoose.Schema.Types.ObjectId, ref:'users', unique:true}
    },
    {
        collection: "pacients"
    }
);

schema.plugin(AutoIncrement, { inc_field: "pacient_id" });

export const User = mongoose.model<IPacient>("Nutrionist", schema);
