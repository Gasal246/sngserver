"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignedCampsListClientPackage = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const mongoose_1 = require("mongoose");
const assignedCampsListClientPackage = async (req, res) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    try {
        const status = req.query.status ? req.query.status.toString() : "";
        const client_package_id = req.query.client_package_id
            ? req.query.client_package_id.toString()
            : "";
        const idValid = await (0, mongoose_1.isValidObjectId)(client_package_id);
        if (!idValid) {
            const data = (0, helpers_1.formatResponse)(200, true, helpers_1.Message.NOT_FOUND, null);
            res.status(200).json(data);
            return;
        }
        const assignedCampsListClientPackage = await services_1.internetPackageClientService.assignedPackageListClientPackageWise(client_package_id, status, req.decodedToken.data.id);
        const results = [];
        for (const a of assignedCampsListClientPackage) {
            const obj = {
                assigned_id: a._id,
                package_id: a.package_id,
                camp_id: a.camp_id,
                assigned_status: a.status,
                id: a.camp_id,
                client_id: a.internet_package_client
                    ? a.internet_package_client.client_id
                    : "",
                internet_package_id: a.internet_package_client
                    ? a.internet_package_client.internet_package_id
                    : "",
                package_name: a.internet_package_client
                    ? a.internet_package_client.package_name
                    : "",
                package_code: a.internet_package_client
                    ? a.internet_package_client.package_code
                    : "",
                package_speed: a.internet_package_client
                    ? a.internet_package_client.package_speed
                    : "",
                package_status: a.internet_package_client
                    ? a.internet_package_client.package_status
                    : "",
                package_price: a.internet_package_client
                    ? a.internet_package_client.package_price
                    : "",
                created_at: a.createdAt,
                updated_at: a.updatedAt,
                deleted_at: a.deleted_at,
                camp_name: a.camp ? a.camp.camp_name : "",
                camp_city: a.camp ? a.camp.camp_city : "",
                router_primary_ip: a.camp ? a.camp.router_primary_ip : "",
                no_of_allowed_user: a.camp ? a.camp.no_of_allowed_user : "",
                no_of_allowed_kiosk: a.camp ? a.camp.no_of_allowed_kiosk : "",
                no_of_allowed_account: a.camp ? a.camp.no_of_allowed_account : "",
                no_of_allowed_coordinators: a.camp
                    ? a.camp.no_of_allowed_coordinators
                    : "",
                is_allowed_package_meal: a.camp ? a.camp.is_allowed_package_meal : "",
                is_allowed_package_water: a.camp ? a.camp.is_allowed_package_water : "",
                is_allowed_package_internet: a.camp
                    ? a.camp.is_allowed_package_internet
                    : "",
                status: a.camp ? a.camp.status : "",
                router_mac_address: a.camp ? a.camp.router_mac_address : "",
                router_ssid: a.camp ? a.camp.router_ssid : "",
                router_secondary_ip: a.camp ? a.camp.router_secondary_ip : "",
                router_pass: a.camp ? a.camp.router_pass : "",
                router_secret: a.camp ? a.camp.router_secret : "",
                router_alias: a.camp ? a.camp.router_alias : "",
                router_hostname: a.camp ? a.camp.router_hostname : "",
                camp_uuid: a.camp ? a.camp.camp_uuid : "",
                original_package_name: ((_b = (_a = a === null || a === void 0 ? void 0 : a.internet_package_client) === null || _a === void 0 ? void 0 : _a.internet_package) === null || _b === void 0 ? void 0 : _b.package_name) || "",
                original_package_code: ((_d = (_c = a === null || a === void 0 ? void 0 : a.internet_package_client) === null || _c === void 0 ? void 0 : _c.internet_package) === null || _d === void 0 ? void 0 : _d.package_code) || "",
                original_package_speed: ((_f = (_e = a === null || a === void 0 ? void 0 : a.internet_package_client) === null || _e === void 0 ? void 0 : _e.internet_package) === null || _f === void 0 ? void 0 : _f.package_speed) || "",
                original_package_status: ((_h = (_g = a === null || a === void 0 ? void 0 : a.internet_package_client) === null || _g === void 0 ? void 0 : _g.internet_package) === null || _h === void 0 ? void 0 : _h.package_status) || "",
                original_duration: (0, helpers_1.minutesToDay)((_k = (_j = a === null || a === void 0 ? void 0 : a.internet_package_client) === null || _j === void 0 ? void 0 : _j.internet_package) === null || _k === void 0 ? void 0 : _k.duration) || "",
                original_type: ((_m = (_l = a === null || a === void 0 ? void 0 : a.internet_package_client) === null || _l === void 0 ? void 0 : _l.internet_package) === null || _m === void 0 ? void 0 : _m.type) || "",
                original_volume: ((_p = (_o = a === null || a === void 0 ? void 0 : a.internet_package_client) === null || _o === void 0 ? void 0 : _o.internet_package) === null || _p === void 0 ? void 0 : _p.volume) || "",
                original_download_bandwidth: ((_r = (_q = a === null || a === void 0 ? void 0 : a.internet_package_client) === null || _q === void 0 ? void 0 : _q.internet_package) === null || _r === void 0 ? void 0 : _r.download_bandwidth) ||
                    "",
                original_upload_bandwidth: ((_t = (_s = a === null || a === void 0 ? void 0 : a.internet_package_client) === null || _s === void 0 ? void 0 : _s.internet_package) === null || _t === void 0 ? void 0 : _t.upload_bandwidth) || "",
            };
            results.push(obj);
        }
        const data = (0, helpers_1.formatResponse)(200, false, "", { list: results });
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
    }
};
exports.assignedCampsListClientPackage = assignedCampsListClientPackage;
//# sourceMappingURL=assigned-camps-list-client-package-wise.js.map