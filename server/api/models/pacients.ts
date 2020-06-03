import mongoose from "mongoose";
import sequence from "mongoose-sequence";
const AutoIncrement = sequence(mongoose);

export interface IPacient extends mongoose.Document {
    patient_id: number;
    marital_status?:string;
    ocupation?:string
    user:string;
    mesures?:any[];
}


const schema = new mongoose.Schema(
    {
        pacient_id: { type: Number, unique: true },
        marital_status: { type: String},
        ocupation: { type:  String, required:false},
        user: {type: mongoose.Schema.Types.ObjectId, ref:'users', unique:true},
        mesures: [{type: Object}]
    },
    {
        collection: "pacients"
    }
);

schema.plugin(AutoIncrement, { inc_field: "pacient_id" });

export const User = mongoose.model<IPacient>("Nutrionist", schema);
