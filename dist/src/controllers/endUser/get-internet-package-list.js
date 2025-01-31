"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInternetPackageListForEndUser = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const getInternetPackageListForEndUser = async (req, res) => {
    var _a, _b, _c, _d;
    try {
        const userData = req.decodedToken.data;
        if (!userData.location_camp.location_verified) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.OUT_OF_SERVICE_AREA, null);
            res.status(400).json(data);
            return;
        }
        // console.log("User Data: ", userData)
        const assignCampDetails = await services_1.userCampService.getAssignCampDetailsOfUser(req.decodedToken.data.id);
        // console.log("Assign Camp Details: ", assignCampDetails)
        if (!assignCampDetails) {
            const data = (0, helpers_1.formatResponse)(400, true, "User not assigned to any camp.", null);
            res.status(400).json(data);
            return;
        }
        if (userData.location_camp.location_camp_client_id.toString() !==
            assignCampDetails.client_id.toString()) {
            const data = (0, helpers_1.formatResponse)(400, true, "Camp id and base camp id not of same client.", null);
            res.status(400).json(data);
            return;
        }
        const list = await services_1.internetPackageClientService.getInternetPackageForPosOrder((0, helpers_1.createObjectId)(userData.location_camp.location_camp_id));
        // console.log("List :", list) // --> Here the list is [] empty!
        if (!list || !list.length) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const internetPackageList = [];
        for (const internetPackage of list) {
            const obj = {};
            obj.package_id = internetPackage.package_id;
            obj.camp_id = internetPackage.camp_id;
            obj.assigned_id = internetPackage._id;
            obj.status = internetPackage.status;
            obj.internet_package_id =
                internetPackage.internet_package_client.internet_package_id;
            obj.package_name = internetPackage.internet_package_client.package_name;
            obj.package_code = internetPackage.internet_package_client.package_code;
            obj.package_speed =
                (_a = internetPackage.package_speed) !== null && _a !== void 0 ? _a : internetPackage.internet_package_client.package_speed;
            obj.package_price =
                (_b = internetPackage.package_sales_price) !== null && _b !== void 0 ? _b : internetPackage.internet_package_client.package_price;
            obj.package_status =
                internetPackage.internet_package_client.package_status;
            obj.createdAt = internetPackage.internet_package_client.createdAt;
            obj.updatedAt = internetPackage.internet_package_client.updatedAt;
            obj.currency_code =
                internetPackage.internet_package_client.client_data.currency_code;
            obj.camp_name = internetPackage.camp.camp_name;
            obj.camp_address = internetPackage.camp.camp_address;
            obj.camp_city = internetPackage.camp.camp_city;
            const originalPackage = internetPackage.internet_package_client.internet_package;
            obj.original_package_id = originalPackage._id;
            obj.original_package_name = originalPackage.package_name;
            obj.original_package_speed = originalPackage.package_speed;
            obj.original_package_code = originalPackage.package_code;
            obj.original_duration = (0, helpers_1.minutesToDay)(originalPackage.duration);
            obj.original_type = originalPackage.type;
            obj.original_volume = originalPackage.volume;
            obj.original_download_bandwidth =
                (_c = internetPackage.download_bandwidth) !== null && _c !== void 0 ? _c : originalPackage.download_bandwidth;
            obj.original_upload_bandwidth =
                (_d = internetPackage.upload_bandwidth) !== null && _d !== void 0 ? _d : originalPackage.upload_bandwidth;
            obj.original_package_status = originalPackage.package_status;
            internetPackageList.push(obj);
        }
        // console.log("Internet Package List ", internetPackageList);
        const data = (0, helpers_1.formatResponse)(200, false, "Internet package list", {
            list: internetPackageList,
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
exports.getInternetPackageListForEndUser = getInternetPackageListForEndUser;
//# sourceMappingURL=get-internet-package-list.js.map