"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientWiseCamp = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const getClientWiseCamp = async (req, res) => {
    try {
        const userData = req.decodedToken.data;
        const campAssignedToUser = await services_1.userCampService.getAssignCampDetailsOfUser(userData.id);
        if (!campAssignedToUser) {
            const data = (0, helpers_1.formatResponse)(400, true, "User not assigned to any camp.", null);
            res.status(400).json(data);
            return;
        }
        const camps = await services_1.campService.getCampByClientId(campAssignedToUser.client_id.toString());
        let baseCamp = {};
        const otherCampsList = [];
        for (const c of camps) {
            if (c._id.toString() === campAssignedToUser.camp_id.toString()) {
                console.log(c);
                baseCamp = c;
            }
            else {
                otherCampsList.push(c);
            }
        }
        const data = (0, helpers_1.formatResponse)(200, false, "Camp details", {
            baseCamp: baseCamp,
            clientOtherCamps: otherCampsList,
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
exports.getClientWiseCamp = getClientWiseCamp;
//# sourceMappingURL=get-client-wise-camps.js.map