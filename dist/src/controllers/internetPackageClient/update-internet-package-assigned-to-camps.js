"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInternetPackageAssignedToCamps = void 0;
const helpers_1 = require("../../helpers");
const internet_package_client_1 = require("../../services/internet_package_client");
const updateInternetPackageAssignedToCamps = async (req, res) => {
    try {
        const internet_package_assign_camp_id = req.params.id;
        if (!internet_package_assign_camp_id) {
            const data = (0, helpers_1.formatResponse)(401, true, "No Internet Package Assigned To Camp Id is provided.", null);
            res.status(401).json(data);
            return;
        }
        const obj = await (0, internet_package_client_1.getInternetPackageAssignedToCampById)(internet_package_assign_camp_id);
        if (!obj) {
            const data = (0, helpers_1.formatResponse)(401, true, "The Provided Id Not Found!!", null);
            res.status(401).json(data);
            return;
        }
        await (0, internet_package_client_1.updateInternetPackageAssignedCamps)(internet_package_assign_camp_id, req.body)
            .then((data) => {
            var _a;
            if (!data) {
                throw new Error("Something went wrong on updating internet package assinged to camp");
            }
            const res_data = (0, helpers_1.formatResponse)(200, false, ((_a = req.body) === null || _a === void 0 ? void 0 : _a.deleted_at)
                ? "Internet Package Assigned to Camp Deleted Successfully"
                : "Internet Package Assigned to Camp Updated Successully", data);
            res.status(200).json(res_data);
            return;
        })
            .catch((e) => console.log(e));
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.updateInternetPackageAssignedToCamps = updateInternetPackageAssignedToCamps;
//# sourceMappingURL=update-internet-package-assigned-to-camps.js.map