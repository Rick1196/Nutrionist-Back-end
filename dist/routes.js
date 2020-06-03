"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./api/controllers/examples/router"));
const router_2 = __importDefault(require("./api/controllers/v1/users/router"));
const router_3 = __importDefault(require("./api/controllers/v1/auth/router"));
const router_4 = __importDefault(require("./api/controllers/v1/misc/router"));
const router_5 = __importDefault(require("./api/controllers/v1/schedule/router"));
function routes(app) {
    app.use("/api/v1/examples", router_1.default);
    app.use("/api/v1/users", router_2.default);
    app.use("/api/v1/auth", router_3.default);
    app.use("/api/v1/misc", router_4.default);
    app.use("/api/v1/schedule", router_5.default);
}
exports.default = routes;
//# sourceMappingURL=routes.js.map