"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addInternetPackageClient = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const addInternetPackageClient = async (req, res) => {
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
        internetPackageClientModel.client_id = req.decodedToken.data.id;
        internetPackageClientModel.package_code = internetPackage.package_code;
        await services_1.internetPackageClientService.createInternetPackageClient(internetPackageClientModel);
        const data = (0, helpers_1.formatResponse)(200, false, "Internet package client created successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.addInternetPackageClient = addInternetPackageClient;
//# sourceMappingURL=add-internet-package-client.js.map