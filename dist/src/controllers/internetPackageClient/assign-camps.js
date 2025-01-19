"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignCamps = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const mongoose_1 = require("mongoose");
const models_1 = __importDefault(require("../../models"));
const assignCamps = async (req, res) => {
    try {
        const objAssignCamps = req.body;
        const camp_ids = objAssignCamps.camp_ids.split(",");
        const idValid = await (0, helpers_1.checkAllIdValid)(camp_ids);
        if (!idValid) {
            const data = (0, helpers_1.formatResponse)(200, true, helpers_1.Message.SOMETHING_WRONG_IN_CAMP_SELECTION, null);
            res.status(200).json(data);
            return;
        }
        const isDuplicate = await (0, helpers_1.hasDuplicate)(camp_ids);
        if (isDuplicate) {
            const data = (0, helpers_1.formatResponse)(200, true, helpers_1.Message.SOMETHING_WRONG_IN_CAMP_SELECTION, null);
            res.status(200).json(data);
            return;
        }
        const checkCamps = await services_1.campService.checkCampsByIdsFromClient(camp_ids, req.decodedToken.data.id);
        if (!checkCamps) {
            const data = (0, helpers_1.formatResponse)(200, true, helpers_1.Message.ACCESS_DENIED_CAMP, null);
            res.status(200).json(data);
            return;
        }
        if (!(0, mongoose_1.isValidObjectId)(objAssignCamps.package_id)) {
            const data = (0, helpers_1.formatResponse)(200, true, "No record available", null);
            res.status(200).json(data);
            return;
        }
        const checkInternetPackage = await services_1.internetPackageClientService.getInternetPackageClientById(objAssignCamps.package_id, req.decodedToken.data.id);
        if (!checkInternetPackage) {
            const data = (0, helpers_1.formatResponse)(200, true, "No record available", null);
            res.status(200).json(data);
            return;
        }
        const objAssignCampsList = [];
        for (const element of camp_ids) {
            const checkDuplicate = await services_1.internetPackageClientService.getAssignCampsByPackageIdAndCampId(element, objAssignCamps.package_id);
            if (checkDuplicate) {
                const data = (0, helpers_1.formatResponse)(200, true, "Internet package already assigned to camp", null);
                res.status(200).json(data);
                return;
            }
            const obj = new models_1.default.InternetPackageAssignCampsModel();
            obj.camp_id = element;
            obj.package_id = objAssignCamps.package_id;
            obj.camp_attach_uuid = (0, helpers_1.generateRandomPackageCode)();
            obj.status = 1;
            objAssignCampsList.push(obj);
        }
        await services_1.internetPackageClientService.assignCamps(objAssignCampsList);
        const data = (0, helpers_1.formatResponse)(200, false, "Internet package assigned to camp successfully", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.assignCamps = assignCamps;
//# sourceMappingURL=assign-camps.js.map