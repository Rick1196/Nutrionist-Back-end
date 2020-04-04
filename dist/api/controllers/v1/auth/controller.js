"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_services_1 = __importDefault(require("../../../services/users.services"));
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../../config/config"));
class Controller {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { user_name, password } = req.body;
            if (!(user_name && password)) {
                return res.status(400).json({ error: 'Please provide user and password' });
            }
            const user = yield users_services_1.default.getByUsername(user_name);
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }
            if (!users_services_1.default.checkIfUnencryptedPasswordIsValid(password, user.password)) {
                return res.status(401).json({ error: 'Wrong password' });
            }
            const token = jwt.sign({ userId: user.user_id, username: user.user_name, userRole: user.role }, config_1.default.jwtSecret, { expiresIn: "5h" });
            res.status(200).json(token);
        });
    }
}
exports.Controller = Controller;
exports.default = new Controller();
//# sourceMappingURL=controller.js.map