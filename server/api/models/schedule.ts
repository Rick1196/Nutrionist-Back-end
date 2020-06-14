import mongoose from "mongoose";
import sequence from "mongoose-sequence";
const AutoIncrement = sequence(mongoose);
export interface ISchedule extends mongoose.Document {
    consultation: number;
    patient_id: string;
    nutritionist_id: string;
    title: string;
    start: Date;
    end: Date;
    color: any;
    allDay: boolean;
    atended: boolean;
}

var Schema = mongoose.Schema;
const schema = new Schema(
    {
        consultation_id: { type: Number, unique: true },
        patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patients', unique: false },
        nutritionist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', unique: false },
        title: { type: String },
        start: { type: Date, required: true },
        end: { type: Date, required: true },
        color: { type: Object, required: true },
        allDay: { type: Boolean, required: true },
        atended: { type: Boolean, required: true, default: false }
    },
    {
        collection: "schedule"
    }
);

schema.plugin(AutoIncrement, { inc_field: "consultation_id" });

export const Schedule = mongoose.model<ISchedule>("schedule", schema);
