"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePos = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const updatePos = async (req, res) => {
    try {
        await services_1.posService.updatePos(req.params.id, req.body);
        const data = (0, helpers_1.formatResponse)(200, false, "Pos updated successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.updatePos = updatePos;
//# sourceMappingURL=update-pos.js.map