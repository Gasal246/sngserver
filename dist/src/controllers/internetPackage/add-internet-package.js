"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addInternetPackage = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const addInternetPackage = async (req, res) => {
    try {
        let code = "";
        const internetPackageModel = req.body;
        let packageCodeFound = null;
        do {
            code = (0, helpers_1.generateRandomPackageCode)();
            packageCodeFound = await services_1.internetPackageService.isPackageCodeFound(code);
        } while (packageCodeFound != null);
        internetPackageModel.package_code = code;
        await services_1.internetPackageService.createInternetPackage(internetPackageModel);
        const data = (0, helpers_1.formatResponse)(200, false, "Internet package created successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.addInternetPackage = addInternetPackage;
//# sourceMappingURL=add-internet-package.js.map