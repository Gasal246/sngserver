"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInternetPackageClient = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const updateInternetPackageClient = async (req, res) => {
    try {
        const internetPackageClientModel = req.body;
        const internetPackage = await services_1.internetPackageService.getInternetPackageById(req.body.internet_package_id);
        if (!internetPackage) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const checkAssignFromAdmin = await services_1.internetPackageService.checkAssignedInternetPackageByAdmin(req.decodedToken.data.id, req.body.internet_package_id);
        if (!checkAssignFromAdmin) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.ACCESS_DENIED_PACKAGE, null);
            res.status(400).json(data);
            return;
        }
        internetPackageClientModel.package_code = internetPackage.package_code;
        await services_1.internetPackageClientService.updateInternetPackageClient(req.params.id, req.body);
        const data = (0, helpers_1.formatResponse)(200, false, "Internet package client updated successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.updateInternetPackageClient = updateInternetPackageClient;
//# sourceMappingURL=update-internet-package-client.js.map