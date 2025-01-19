"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInternetPackagesClient = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const getAllInternetPackagesClient = async (req, res) => {
    try {
        const status = req.query.status ? req.query.status.toString() : "";
        const filter = new Object();
        if (status) {
            filter.package_status = parseInt(status);
        }
        else {
            filter.package_status = { $ne: 0 };
        }
        filter.client_id = (0, helpers_1.createObjectId)(req.decodedToken.data.id);
        const internetPackagesClient = await services_1.internetPackageClientService.getAllInternetPackagesClient(filter);
        const data = (0, helpers_1.formatResponse)(200, false, "Internet packages client detail.", { list: internetPackagesClient });
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.getAllInternetPackagesClient = getAllInternetPackagesClient;
//# sourceMappingURL=get-internet-packages-client.js.map