"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_sequence_1 = __importDefault(require("mongoose-sequence"));
const AutoIncrement = mongoose_sequence_1.default(mongoose_1.default);
const schema = new mongoose_1.default.Schema({
    nutrionist_id: { type: Number, unique: true },
    card_id: { type: String, required: false },
    image: { type: Buffer, required: false },
    pacients: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users' }],
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users', unique: true }
}, {
    collection: "nutrionists"
});
schema.plugin(AutoIncrement, { inc_field: "nutrionist_id" });
exports.User = mongoose_1.default.model("Nutrionist", schema);
//# sourceMappingURL=nutrionists.js.map