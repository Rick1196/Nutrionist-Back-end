"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const checkJwt_1 = require("../../../middlewares/checkJwt");
exports.default = express_1.default
    .Router()
    .post("/new-date", [checkJwt_1.checkJwt], controller_1.default.createConsultation)
    .post("/filter-by-range", [checkJwt_1.checkJwt], controller_1.default.filterByRange);
//# sourceMappingURL=router.js.map