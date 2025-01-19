"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const enums_1 = require("../types/enums");
const customFormatter = winston_1.default.format((info) => {
    var _a;
    if (info instanceof Error) {
        const data = ((_a = info.stack) === null || _a === void 0 ? void 0 : _a.toString().replace(/Error: /gi, "").replace(/\s+/gi, " ").replace(/\n/gi, "")) || {};
        info.message = data.toString();
        return info;
    }
    return info;
});
const formatter = () => {
    return winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format.colorize(), customFormatter(), winston_1.default.format.simple());
};
exports.logger = winston_1.default.createLogger({
    level: "debug",
    format: formatter(),
    transports: [new winston_1.default.transports.Console()],
});
if (process.env.NODE_ENV === enums_1.Env.PROD || process.env.NODE_ENV === enums_1.Env.STAGE) {
    const prodConfig = new winston_1.default.transports.Console({
        format: formatter(),
        level: "warn",
    });
    exports.logger.add(prodConfig);
}
//# sourceMappingURL=logger.js.map