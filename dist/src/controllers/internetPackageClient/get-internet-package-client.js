"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneInternetPackageClient = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const getOneInternetPackageClient = async (req, res) => {
    try {
        const filter = new Object();
        filter._id = (0, helpers_1.createObjectId)(req.params.id);
        filter.client_id = (0, helpers_1.createObjectId)(req.decodedToken.data.id);
        const internetPackageClient = await services_1.internetPackageClientService.getAllInternetPackagesClient(filter);
        if (!internetPackageClient) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const data = (0, helpers_1.formatResponse)(200, false, "Internet package detail.", {
            list: internetPackageClient.length ? internetPackageClient[0] : null,
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
exports.getOneInternetPackageClient = getOneInternetPackageClient;
//# sourceMappingURL=get-internet-package-client.js.map