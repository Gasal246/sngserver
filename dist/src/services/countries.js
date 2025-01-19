"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCountry = exports.updateStatus = exports.getCountryByIdWithoutStatus = exports.getCountryById = exports.getAllCountries = exports.checkCountriesData = exports.createCountry = void 0;
const helpers_1 = require("../helpers");
const models_1 = __importDefault(require("../models"));
const countriesModel = models_1.default.countriesModel;
const createCountry = async (country) => {
    const countryData = country;
    countryData.status = 1;
    return await countriesModel.create(countryData);
};
exports.createCountry = createCountry;
const checkCountriesData = async (countriesData, id) => {
    const filter = {
        $or: [
            {
                name: countriesData.name,
            },
            {
                short_name: countriesData.short_name,
            },
            {
                country_code: countriesData.country_code,
            },
            {
                currency_code: countriesData.currency_code,
            },
            {
                name: countriesData.name,
                short_name: countriesData.short_name,
                country_code: countriesData.country_code,
                currency_code: countriesData.currency_code,
            },
        ],
        status: {
            $ne: 0,
        },
    };
    if (id) {
        filter._id = { $ne: (0, helpers_1.createObjectId)(id) };
    }
    return await countriesModel.findOne(filter);
};
exports.checkCountriesData = checkCountriesData;
const getAllCountries = async (status) => {
    const filter = {
        status: status
            ? parseInt(status)
            : {
                $ne: 0,
            },
    };
    const results = await countriesModel.find(filter);
    return results;
};
exports.getAllCountries = getAllCountries;
const getCountryById = async (id) => {
    return await countriesModel.findOne({ _id: id, status: 1 });
};
exports.getCountryById = getCountryById;
const getCountryByIdWithoutStatus = async (id) => {
    return await countriesModel.findOne({ _id: id });
};
exports.getCountryByIdWithoutStatus = getCountryByIdWithoutStatus;
const updateStatus = async (id, status) => {
    await countriesModel.updateOne({ _id: id }, { status: status });
    return;
};
exports.updateStatus = updateStatus;
const updateCountry = async (id, country) => {
    const countryData = country;
    await countriesModel.updateOne({ _id: id }, countryData);
    return;
};
exports.updateCountry = updateCountry;
//# sourceMappingURL=countries.js.map