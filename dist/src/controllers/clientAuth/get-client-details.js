"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientDetails = void 0;
const helpers_1 = require("../../helpers");
const getClientDetails = async (req, res) => {
    try {
        const data = (0, helpers_1.formatResponse)(200, false, helpers_1.Message.USER_DETAIL, {
            user_data: req.decodedToken.data,
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
exports.getClientDetails = getClientDetails;
//# sourceMappingURL=get-client-details.js.map