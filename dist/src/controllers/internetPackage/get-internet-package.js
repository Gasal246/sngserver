"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneInternetPackage = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const getOneInternetPackage = async (req, res) => {
    try {
        const internetPackage = await services_1.internetPackageService.getInternetPackageById(req.params.id);
        if (!internetPackage) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const data = (0, helpers_1.formatResponse)(200, false, "Internet package detail.", {
            list: internetPackage,
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
exports.getOneInternetPackage = getOneInternetPackage;
//# sourceMappingURL=get-internet-package.js.map