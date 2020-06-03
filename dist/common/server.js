"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const os_1 = __importDefault(require("os"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const openapi_1 = __importDefault(require("./openapi"));
const logger_1 = __importDefault(require("./logger"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
class ExpressServer {
    constructor() {
        const root = path_1.default.normalize(__dirname + "/../..");
        app.set("appPath", root + "client");
        app.use(morgan_1.default("dev"));
        app.use(express_1.default.json({ limit: "20mb" }));
        app.use(express_1.default.urlencoded({
            extended: true,
            limit: "20mb"
        }));
        app.use(cookie_parser_1.default(process.env.SESSION_SECRET));
        app.use(body_parser_1.default.json());
        app.use(express_1.default.static(`${root}/public`));
        app.use(cors_1.default());
    }
    router(routes) {
        openapi_1.default(app, routes);
        return this;
    }
    database(db) {
        db.init();
        return this;
    }
    listen(p = process.env.PORT) {
        const welcome = port => () => logger_1.default.info(`up and running in ${process.env.NODE_ENV ||
            "development"} @: ${os_1.default.hostname()} on port: ${port}`);
        http_1.default.createServer(app).listen(p, welcome(p));
        return app;
    }
}
exports.default = ExpressServer;
//# sourceMappingURL=server.js.map