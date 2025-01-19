"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCountries = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const getAllCountries = async (req, res) => {
    var _a;
    try {
        const status = (_a = req.query.status) === null || _a === void 0 ? void 0 : _a.toString();
        const countries = await services_1.countriesService.getAllCountries(status);
        const data = (0, helpers_1.formatResponse)(200, false, "Countries details.", {
            list: countries,
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
exports.getAllCountries = getAllCountries;
//# sourceMappingURL=get-countries.js.map