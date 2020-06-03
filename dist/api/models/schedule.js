"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_sequence_1 = __importDefault(require("mongoose-sequence"));
const AutoIncrement = mongoose_sequence_1.default(mongoose_1.default);
const schema = new mongoose_1.default.Schema({
    consultation_id: { type: Number, unique: true },
    patient_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users', unique: false },
    nutritionist_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users', unique: false },
    title: { type: String },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    color: { type: Object, required: true },
    allDay: { type: Boolean, required: true }
}, {
    collection: "schedule"
});
schema.plugin(AutoIncrement, { inc_field: "consultation_id" });
exports.Schedule = mongoose_1.default.model("Nutrionist", schema);
//# sourceMappingURL=schedule.js.map