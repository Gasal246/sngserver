"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCamps = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const getAllCamps = async (req, res) => {
    var _a;
    try {
        const status = (_a = req.query.status) === null || _a === void 0 ? void 0 : _a.toString();
        const camps = await services_1.campService.getAllCamps(req.decodedToken.data.id, status);
        const data = (0, helpers_1.formatResponse)(200, false, "Camp detail.", { list: camps });
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.getAllCamps = getAllCamps;
//# sourceMappingURL=get-camps.js.map