"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCamp = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const addCamp = async (req, res) => {
    try {
        const totalCount = await services_1.campService.getCampsCount(req.decodedToken.data.id);
        const limit = req.decodedToken.data.no_camp;
        if (totalCount >= limit) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.EXCEED_LIMIT, null);
            res.status(200).json(data);
            return;
        }
        await services_1.campService.createCamp(req.decodedToken.data.id, req.body);
        const data = (0, helpers_1.formatResponse)(200, false, "Camp created successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.addCamp = addCamp;
//# sourceMappingURL=add-camp.js.map