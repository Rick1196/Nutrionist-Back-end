"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_sequence_1 = __importDefault(require("mongoose-sequence"));
const AutoIncrement = mongoose_sequence_1.default(mongoose_1.default);
const schema = new mongoose_1.default.Schema({
    id: { type: Number, unique: true },
    name: String
}, {
    collection: "examples"
});
schema.plugin(AutoIncrement, { inc_field: "id" });
exports.Example = mongoose_1.default.model("Example", schema);
//# sourceMappingURL=example.js.map