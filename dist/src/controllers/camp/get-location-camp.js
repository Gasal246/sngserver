"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationWiseCamp = void 0;
const helpers_1 = require("../../helpers");
const getLocationWiseCamp = async (req, res) => {
    try {
        const status = req.query.location_status
            ? parseInt(req.query.location_status.toString())
            : 1;
        let id = "64a7dbbb99a4dc9e7f1dd72a";
        if (status === 2) {
            id = "64af8dff854e07ff4aac9b19";
        }
        else if (status === 3) {
            id = "0";
        }
        const data = (0, helpers_1.formatResponse)(200, false, "Camp detail.", {
            list: { id: id },
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
exports.getLocationWiseCamp = getLocationWiseCamp;
//# sourceMappingURL=get-location-camp.js.map