"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInternetPackages = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const getAllInternetPackages = async (req, res) => {
    try {
        const status = req.query.status ? req.query.status.toString() : "";
        const internetPackages = await services_1.internetPackageService.getAllInternetPackage(status);
        const data = (0, helpers_1.formatResponse)(200, false, "Internet package detail.", {
            list: internetPackages,
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
exports.getAllInternetPackages = getAllInternetPackages;
//# sourceMappingURL=get-internet-packages.js.map