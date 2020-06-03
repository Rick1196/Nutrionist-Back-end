"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomException extends Error {
    constructor(args) {
        super();
        this.message = args;
    }
}
exports.default = CustomException;
//# sourceMappingURL=exception.js.map