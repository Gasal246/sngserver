"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneCamp = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const getOneCamp = async (req, res) => {
    try {
        const camp = await services_1.campService.getCampById(req.params.id);
        if (!camp) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const data = (0, helpers_1.formatResponse)(200, false, "Camp detail.", { list: camp });
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.getOneCamp = getOneCamp;
//# sourceMappingURL=get-camp.js.map