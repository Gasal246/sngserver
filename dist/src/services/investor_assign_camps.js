"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permenentDeleteInvestorAssignedCamp = exports.restoreDeletedInvestorCampId = exports.removeInvestorAssignedCampId = exports.getInvestorAssignedCampsList = exports.createInvestorAssignCampDocument = void 0;
const helpers_1 = require("../helpers");
const models_1 = __importDefault(require("../models"));
const investorAssignCampsModel = models_1.default.investorAssignCampModel;
const createInvestorAssignCampDocument = async (investor_id, camp_id) => {
    const alreadyAdded = await investorAssignCampsModel.findOne({
        investor_id: (0, helpers_1.createObjectId)(investor_id),
        camp_id: (0, helpers_1.createObjectId)(camp_id),
    });
    if (alreadyAdded)
        return null;
    const newData = new investorAssignCampsModel({
        investor_id: (0, helpers_1.createObjectId)(investor_id),
        camp_id: (0, helpers_1.createObjectId)(camp_id),
    });
    const savedData = await newData.save();
    return savedData;
};
exports.createInvestorAssignCampDocument = createInvestorAssignCampDocument;
const getInvestorAssignedCampsList = async (investor_id, status) => {
    const filter = {
        investor_id: (0, helpers_1.createObjectId)(investor_id),
        status: status || "active",
    };
    const result = await investorAssignCampsModel.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "investors",
                localField: "investor_id",
                foreignField: "_id",
                as: "investor",
            },
        },
        {
            $unwind: "$investor",
        },
        {
            $lookup: {
                from: "camps",
                localField: "camp_id",
                foreignField: "_id",
                as: "camp_data",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            camp_name: 1,
                            camp_city: 1,
                            camp_address: 1,
                            status: 1,
                            createdAt: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$camp_data",
        },
    ]);
    return result;
};
exports.getInvestorAssignedCampsList = getInvestorAssignedCampsList;
const removeInvestorAssignedCampId = async (investor_id, camp_id) => {
    const result = await investorAssignCampsModel.findOneAndUpdate({
        investor_id: (0, helpers_1.createObjectId)(investor_id),
        camp_id: (0, helpers_1.createObjectId)(camp_id),
    }, { status: "deleted" }, { new: true });
    return result;
};
exports.removeInvestorAssignedCampId = removeInvestorAssignedCampId;
const restoreDeletedInvestorCampId = async (investor_id, camp_id) => {
    const result = await investorAssignCampsModel.findOneAndUpdate({
        investor_id: (0, helpers_1.createObjectId)(investor_id),
        camp_id: (0, helpers_1.createObjectId)(camp_id),
    }, { status: "active" }, { new: true });
    return result;
};
exports.restoreDeletedInvestorCampId = restoreDeletedInvestorCampId;
const permenentDeleteInvestorAssignedCamp = async (investor_id, camp_id) => {
    const result = await investorAssignCampsModel.findOneAndDelete({
        investor_id: (0, helpers_1.createObjectId)(investor_id),
        camp_id: (0, helpers_1.createObjectId)(camp_id),
    });
    return result;
};
exports.permenentDeleteInvestorAssignedCamp = permenentDeleteInvestorAssignedCamp;
//# sourceMappingURL=investor_assign_camps.js.map