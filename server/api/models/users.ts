import mongoose from "mongoose";
import sequence from "mongoose-sequence";
import {Hash} from "fast-sha256";
const AutoIncrement = sequence(mongoose);

export interface IUserModel extends mongoose.Document {
    user_id: number;
    first_name: string;
    last_name: string;
    phone: number;
    country: string;
    state: string;
    citie: string;
    email?: string;
    gender: string;
    birth_date: Date;
    register_date: Date;
    last_login: Date;
    role: string;
    status: string;
    password: string;
    user_name: string;
    confirmed: boolean;
    cofirmation_code: string;
}


const schema = new mongoose.Schema(
    {
        user_id: { type: Number, unique: true },
        first_name: { type: String, },
        last_name: { type: String },
        phone: { type: String },
        country: { type: String },
        state: { type: String },
        citie: { type: String },
        email: { type: String, required:false },
        gender: { type: String },
        birth_date: { type: Date },
        register_date: { type: Date, default: Date.now() },
        last_login: { type: Date, required:false },
        role: { type: String },
        status: { type: String },
        password: { type: String, required: true },
        user_name: { type: String, unique: true, required: true },
        confirmed: {type: Boolean, required:true, default: false},
        confirmation_code:{type:Boolean, required:false, default: Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 4).toUpperCase()}
    },
    {
        collection: "users"
    }
);

schema.plugin(AutoIncrement, { inc_field: "user_id" });

export const User = mongoose.model<IUserModel>("Nutrionist", schema);
