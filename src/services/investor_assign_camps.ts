import { createObjectId } from "../helpers";
import db from "../models";
import { IInvestor_assign_camps } from "../models/investor_assign_camps.model";

const investorAssignCampsModel = db.investorAssignCampModel;

export const createInvestorAssignCampDocument = async (
  investor_id: string,
  camp_id: string
): Promise<IInvestor_assign_camps | null> => {
  const alreadyAdded = await investorAssignCampsModel.findOne({
    investor_id: createObjectId(investor_id),
    camp_id: createObjectId(camp_id),
  });
  if (alreadyAdded) return null;
  const newData = new investorAssignCampsModel({
    investor_id: createObjectId(investor_id),
    camp_id: createObjectId(camp_id),
  });
  const savedData = await newData.save();
  return savedData;
};

export const getInvestorAssignedCampsList = async (
  investor_id: string,
  status: string
) => {
  const filter = {
    investor_id: createObjectId(investor_id),
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

export const removeInvestorAssignedCampId = async (
  investor_id: string,
  camp_id: string
) => {
  const result = await investorAssignCampsModel.findOneAndUpdate(
    {
      investor_id: createObjectId(investor_id),
      camp_id: createObjectId(camp_id),
    },
    { status: "deleted" },
    { new: true }
  );
  return result;
};

export const restoreDeletedInvestorCampId = async (
  investor_id: string,
  camp_id: string
) => {
  const result = await investorAssignCampsModel.findOneAndUpdate(
    {
      investor_id: createObjectId(investor_id),
      camp_id: createObjectId(camp_id),
    },
    { status: "active" },
    { new: true }
  );
  return result;
};

export const permenentDeleteInvestorAssignedCamp = async (
  investor_id: string,
  camp_id: string
) => {
  const result = await investorAssignCampsModel.findOneAndDelete({
    investor_id: createObjectId(investor_id),
    camp_id: createObjectId(camp_id),
  });
  return result;
};

export const isInvestorAssignedToCamp = async (
  investor_id: string,
  camp_id: string
) => {
  const result = await investorAssignCampsModel.findOne({
    investor_id: createObjectId(investor_id),
    camp_id: createObjectId(camp_id),
  });
  return !!result;
};
