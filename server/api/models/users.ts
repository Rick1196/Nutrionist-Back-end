import mongoose from "mongoose";
import sequence from "mongoose-sequence";
const AutoIncrement = sequence(mongoose);

export interface IUserModel extends mongoose.Document {
    user_id: number;
    first_name: string;
    last_name: string;
    phone: number;
    zp: string;
    country: string;
    state: string;
    citie: string;
    email: string;
    gender: string;
    birth_date: Date;
    register_date: Date;
    last_login: Date;
    role: string;
    status: string;
    password: string;
    user_name: string;
}


const schema = new mongoose.Schema(
    {
        user_id: { type: Number, unique: true },
        first_name: { type: String, },
        last_name: { type: String },
        phone: { type: String },
        zp: { type: String },
        country: { type: String },
        state: { type: String },
        citie: { type: String },
        email: { type: String },
        gender: { type: String },
        birth_date: { type: Date },
        register_date: { type: Date },
        last_login: { type: Date },
        role: { type: String },
        status: { type: String },
        password: { type: String, required: true },
        user_name: { type: String, unique: true, required: true }
    },
    {
        collection: "users"
    }
);

schema.plugin(AutoIncrement, { inc_field: "user_id" });

export const User = mongoose.model<IUserModel>("Nutrionist", schema);
