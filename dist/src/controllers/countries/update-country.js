"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCountry = void 0;
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const updateCountry = async (req, res) => {
    try {
        await services_1.countriesService.updateCountry(req.params.id, req.body);
        const data = (0, helpers_1.formatResponse)(200, false, "Country updated successfully.", null);
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.updateCountry = updateCountry;
//# sourceMappingURL=update-country.js.map