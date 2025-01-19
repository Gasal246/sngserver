"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignedPackageListClientWise = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const assignedPackageListClientWise = async (req, res) => {
    try {
        const status = req.query.status ? req.query.status.toString() : "";
        const client_id = req.query.client_id
            ? req.query.client_id.toString()
            : "";
        const assignedPackageListClientWise = await services_1.internetPackageService.assignedPackageListClientWise(client_id, status);
        const result = [];
        for (const element of assignedPackageListClientWise) {
            const obj = {};
            obj.id = element._id;
            obj.client_id = element.client_id;
            obj.internet_package_id = element.internet_package_id;
            obj.attached_uuid = element.attached_uuid;
            obj.created_at = element.createdAt;
            obj.updated_at = element.updatedAt;
            obj.deleted_at = element.deleted_at;
            obj.original_package_name = "";
            obj.original_package_code = "";
            obj.original_package_speed = "";
            obj.original_package_status = "";
            obj.original_duration = "";
            obj.original_type = "";
            obj.original_volume = "";
            obj.original_download_bandwidth = "";
            obj.original_upload_bandwidth = "";
            if (element.internet_package) {
                obj.original_package_name = element.internet_package.package_name;
                obj.original_package_code = element.internet_package.package_code;
                obj.original_package_speed = element.internet_package.package_speed;
                obj.original_package_status = element.internet_package.package_status;
                obj.original_duration = (0, helpers_1.minutesToDay)(element.internet_package.duration);
                obj.original_type = element.internet_package.type;
                obj.original_volume = element.internet_package.volume;
                obj.original_download_bandwidth =
                    element.internet_package.download_bandwidth;
                obj.original_upload_bandwidth =
                    element.internet_package.upload_bandwidth;
            }
            result.push(obj);
        }
        const data = (0, helpers_1.formatResponse)(200, false, "", { list: result });
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
    }
};
exports.assignedPackageListClientWise = assignedPackageListClientWise;
//# sourceMappingURL=assigned-package-list-client-wise.js.map