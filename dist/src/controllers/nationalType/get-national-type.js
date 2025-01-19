"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneNationalType = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const getOneNationalType = async (req, res) => {
    try {
        const nationalType = await services_1.nationalTypeService.getNationalTypeById(req.params.id);
        if (!nationalType) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const data = (0, helpers_1.formatResponse)(200, false, "National type detail.", {
            list: nationalType,
        });
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.getOneNationalType = getOneNationalType;
//# sourceMappingURL=get-national-type.js.map