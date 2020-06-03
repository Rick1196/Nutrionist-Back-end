import mongoose from "mongoose";
import sequence from "mongoose-sequence";
const AutoIncrement = sequence(mongoose);

export interface INutritionist extends mongoose.Document {
    nutritionist_id: number;
    card_id?: number;
    image?: any;
    data_type?: string;
    patients?: string[];
    user: string;
}

const schema = new mongoose.Schema(
    {
        nutritionist_id: { type: Number, unique: true },
        card_id: { type: String, required: false },
        image: { type: Buffer, required: false },
        data_type: { type: String, required: false },
        patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', unique: true }
    },
    {
        collection: "nutritionists"
    }
);

schema.plugin(AutoIncrement, { inc_field: "nutritionist_id" });

export const Nutritionist = mongoose.model<INutritionist>("nutritionists", schema);
