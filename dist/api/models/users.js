"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_sequence_1 = __importDefault(require("mongoose-sequence"));
const AutoIncrement = mongoose_sequence_1.default(mongoose_1.default);
const schema = new mongoose_1.default.Schema({
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
}, {
    collection: "users"
});
schema.plugin(AutoIncrement, { inc_field: "user_id" });
exports.User = mongoose_1.default.model("Nutrionist", schema);
//# sourceMappingURL=users.js.map