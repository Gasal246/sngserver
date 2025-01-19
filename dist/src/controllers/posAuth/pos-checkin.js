"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posCheckin = void 0;
const helpers_1 = require("../../helpers");
const posCheckin = async (req, res) => {
    try {
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.posCheckin = posCheckin;
//# sourceMappingURL=pos-checkin.js.map