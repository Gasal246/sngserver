"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneCountry = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const getOneCountry = async (req, res) => {
    try {
        const country = await services_1.countriesService.getCountryById(req.params.id);
        if (!country) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const data = (0, helpers_1.formatResponse)(200, false, "Country detail.", {
            list: country,
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
exports.getOneCountry = getOneCountry;
//# sourceMappingURL=get-country.js.map