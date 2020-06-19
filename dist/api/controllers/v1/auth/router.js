"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
exports.default = express_1.default
    .Router()
    .post("/login", controller_1.default.login)
    .post("/register-nutritionist", controller_1.default.registerNutritionist)
    .get("/resend-code/:username", controller_1.default.sendVerficationCode)
    .get("/request-change/:username", controller_1.default.requestResetPassword)
    .get("/change-password/:username/:password/:code", controller_1.default.resetPassowrd)
    .post("/validate-user", controller_1.default.confirmUser);
//# sourceMappingURL=router.js.map