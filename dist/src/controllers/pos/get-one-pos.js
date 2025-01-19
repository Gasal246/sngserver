"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnePos = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const getOnePos = async (req, res) => {
    try {
        const pos = await services_1.posService.getPosById(req.params.id);
        if (!pos) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const data = (0, helpers_1.formatResponse)(200, false, "Pos detail.", { list: pos });
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.getOnePos = getOnePos;
//# sourceMappingURL=get-one-pos.js.map