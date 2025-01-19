"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlantManagers = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const getAllPlantManagers = async (req, res) => {
    var _a;
    try {
        const status = (_a = req.query.status) === null || _a === void 0 ? void 0 : _a.toString();
        const filter = {
            client_id: null,
            status: status
                ? parseInt(status)
                : {
                    $ne: 0,
                },
        };
        const plantManagers = await services_1.plantManagerService.getAllPlantManager(filter);
        const data = (0, helpers_1.formatResponse)(200, false, "Plant manager details.", {
            list: plantManagers,
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
exports.getAllPlantManagers = getAllPlantManagers;
//# sourceMappingURL=get-plant-managers.js.map