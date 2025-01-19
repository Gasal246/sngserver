"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInternetPackage = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const updateInternetPackage = async (req, res) => {
    try {
        await services_1.internetPackageService.updateInternetPackage(req.params.id, req.body);
        const data = (0, helpers_1.formatResponse)(200, false, "Internet package updated successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.updateInternetPackage = updateInternetPackage;
//# sourceMappingURL=update-internet-package.js.map