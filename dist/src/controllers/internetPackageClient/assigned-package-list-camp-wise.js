"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignedPackageListCampWise = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const enums_1 = require("../../types/enums");
const assignedPackageListCampWise = async (req, res) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    try {
        const status = req.query.status ? req.query.status.toString() : "";
        const camp_ids = req.query.camp_ids
            ? req.query.camp_ids.toString().split(",")
            : [];
        const idValid = await (0, helpers_1.checkAllIdValid)(camp_ids);
        if (!idValid) {
            const data = (0, helpers_1.formatResponse)(200, true, helpers_1.Message.SOMETHING_WRONG_IN_CAMP_SELECTION, null);
            res.status(200).json(data);
            return;
        }
        let clientId = "";
        if (req.decodedToken.data.role_slug == enums_1.Roles.ROLE_CLIENT_ADMIN) {
            clientId = req.decodedToken.data.id;
        }
        const checkCamps = await services_1.campService.checkCampsByIdsFromClient(camp_ids, clientId);
        if (!checkCamps) {
            if (req.decodedToken.data.role_slug == enums_1.Roles.ROLE_CLIENT_ADMIN) {
                const data = (0, helpers_1.formatResponse)(200, true, helpers_1.Message.ACCESS_DENIED_CAMP, null);
                res.status(200).json(data);
                return;
            }
            else {
                const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
                res.status(400).json(data);
                return;
            }
        }
        const assignedPackageListCampWise = await services_1.internetPackageClientService.assignedPackageListCampsWise((0, helpers_1.convertsObjectIds)(camp_ids), status);
        const results = [];
        for (const a of assignedPackageListCampWise) {
            const obj = {
                package_id: a.package_id,
                camp_id: a.camp_id,
                assigned_status: a.status,
                id: a.package_id,
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
exports.assignedPackageListCampWise = assignedPackageListCampWise;
//# sourceMappingURL=assigned-package-list-camp-wise.js.map