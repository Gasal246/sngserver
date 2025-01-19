"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignedClientsListPackageWise = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const assignedClientsListPackageWise = async (req, res) => {
    try {
        const status = req.query.status ? req.query.status.toString() : "";
        const package_id = req.query.package_id
            ? req.query.package_id.toString()
            : "";
        const assignedClientsListPackageWise = await services_1.internetPackageService.assignedClientsListPackageWise(package_id, status);
        const result = [];
        for (const element of assignedClientsListPackageWise) {
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
            obj.full_name = "";
            obj.email = "";
            obj.business_name = "";
            obj.phone = "";
            obj.business_address = "";
            obj.city = "";
            obj.country = "";
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
            if (element.client) {
                obj.full_name = element.client.full_name;
                obj.email = element.client.email;
                obj.business_name = element.client.business_name;
                obj.phone = element.client.phone;
                obj.business_address = element.client.business_address;
                obj.city = element.client.city;
                obj.country = element.client.country;
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
exports.assignedClientsListPackageWise = assignedClientsListPackageWise;
//# sourceMappingURL=assigned-clients-list-package-wise.js.map