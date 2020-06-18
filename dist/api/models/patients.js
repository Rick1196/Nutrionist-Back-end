"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_sequence_1 = __importDefault(require("mongoose-sequence"));
const AutoIncrement = mongoose_sequence_1.default(mongoose_1.default);
const schema = new mongoose_1.default.Schema({
    patient_id: { type: Number, unique: true },
    marital_status: { type: String },
    ocupation: { type: String, required: false },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users', unique: true },
    mesures: [{ type: Object }]
}, {
    collection: "patients"
});
schema.plugin(AutoIncrement, { inc_field: "patient_id" });
exports.Patient = mongoose_1.default.model("patients", schema);
//# sourceMappingURL=patients.js.map