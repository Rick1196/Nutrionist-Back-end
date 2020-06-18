"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_sequence_1 = __importDefault(require("mongoose-sequence"));
const AutoIncrement = mongoose_sequence_1.default(mongoose_1.default);
const schema = new mongoose_1.default.Schema({
    nutritionist_id: { type: Number, unique: true },
    card_id: { type: String, required: false },
    image: { type: Buffer, required: false },
    data_type: { type: String, required: false },
    patients: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'patients' }],
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users', unique: true }
}, {
    collection: "nutritionists"
});
schema.plugin(AutoIncrement, { inc_field: "nutritionist_id" });
exports.Nutritionist = mongoose_1.default.model("nutritionists", schema);
//# sourceMappingURL=nutrionists.js.map