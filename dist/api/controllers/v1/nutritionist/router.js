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
    .get("/get-nutritionist-profile/:user_name", [checkJwt_1.checkJwt], controller_1.default.profile)
    .get("/get-statistics/:username", [checkJwt_1.checkJwt], controller_1.default.getStatistics)
    .get("/by-fullname", [checkJwt_1.checkJwt], controller_1.default.getByFullName)
    .get("/patients/:username", [checkJwt_1.checkJwt], controller_1.default.patientsFilter);
//# sourceMappingURL=router.js.map