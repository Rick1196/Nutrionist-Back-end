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
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../../../common/logger"));
const common_services_1 = __importDefault(require("../../../services/common.services"));
class Controller {
    getCountries(req, res, nex) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("retriving countries");
                let countires = yield common_services_1.default.getCoutnries();
                return res.status(200).json(countires);
            }
            catch (e) {
                return res.status(500).json(e);
            }
        });
    }
}
exports.Controller = Controller;
exports.default = new Controller();
//# sourceMappingURL=controller.js.map