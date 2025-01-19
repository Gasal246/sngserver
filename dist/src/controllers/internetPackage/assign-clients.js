"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignClients = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const mongoose_1 = require("mongoose");
const models_1 = __importDefault(require("../../models"));
const assignClients = async (req, res) => {
    try {
        const objAssignClients = req.body;
        const client_ids = objAssignClients.client_ids.split(",");
        const idValid = await (0, helpers_1.checkAllIdValid)(client_ids);
        if (!idValid) {
            const data = (0, helpers_1.formatResponse)(200, true, helpers_1.Message.INVALID_CLIENT_IDS, null);
            res.status(200).json(data);
            return;
        }
        const isDuplicate = await (0, helpers_1.hasDuplicate)(client_ids);
        if (isDuplicate) {
            const data = (0, helpers_1.formatResponse)(200, true, helpers_1.Message.INVALID_CLIENT_IDS, null);
            res.status(200).json(data);
            return;
        }
        const checkClients = await services_1.clientService.checkClientsByIds(client_ids);
        if (!checkClients) {
            const data = (0, helpers_1.formatResponse)(200, true, helpers_1.Message.INVALID_CLIENT_IDS, null);
            res.status(200).json(data);
            return;
        }
        if (!(0, mongoose_1.isValidObjectId)(objAssignClients.internet_package_id)) {
            const data = (0, helpers_1.formatResponse)(200, true, "No record available", null);
            res.status(200).json(data);
            return;
        }
        const checkInternetPackage = await services_1.internetPackageService.getInternetPackageById(objAssignClients.internet_package_id);
        if (!checkInternetPackage) {
            const data = (0, helpers_1.formatResponse)(200, true, "No record available", null);
            res.status(200).json(data);
            return;
        }
        const objAssignClientsList = [];
        for (const element of client_ids) {
            const checkDuplicate = await services_1.internetPackageService.getAssignClientByPackageIdAndClientId(element, objAssignClients.internet_package_id);
            if (checkDuplicate) {
                const data = (0, helpers_1.formatResponse)(200, true, "Internet package already assigned to client", null);
                res.status(200).json(data);
                return;
            }
            const obj = new models_1.default.InternetPackageAssignClientModel();
            obj.client_id = element;
            obj.internet_package_id = objAssignClients.internet_package_id;
            obj.attached_uuid = (0, helpers_1.generateRandomPackageCode)();
            objAssignClientsList.push(obj);
        }
        await services_1.internetPackageService.assignClients(objAssignClientsList);
        const data = (0, helpers_1.formatResponse)(200, false, "Internet package assigned to client successfully", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.assignClients = assignClients;
//# sourceMappingURL=assign-clients.js.map