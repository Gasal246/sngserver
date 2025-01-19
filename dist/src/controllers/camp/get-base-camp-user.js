"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseCampUser = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const mongoose_1 = require("mongoose");
const getBaseCampUser = async (req, res) => {
    try {
        const campId = req.query.camp_id ? req.query.camp_id.toString() : "";
        if (campId) {
            if (!(0, mongoose_1.isValidObjectId)(campId)) {
                const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
                res.status(400).json(data);
                return;
            }
        }
        const list = await services_1.campService.getBaseCampUserDetails((0, helpers_1.createObjectId)(req.decodedToken.data.id), campId);
        if (!list || !list.length) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const data = (0, helpers_1.formatResponse)(200, false, "Camp with user details", {
            list: list,
        });
        res.status(200).json(data);
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.getBaseCampUser = getBaseCampUser;
//# sourceMappingURL=get-base-camp-user.js.map