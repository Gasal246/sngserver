import { createObjectId } from "../helpers";
import db from "../models";
const companionDevicesModel = db.companionDevicesModel;

interface companionData {
  user_id: string;
  nth_number: number;
  expo_token: string;
  device_name: string;
  device_model: string;
  os: string;
  os_version: string;
}

interface NextNthResult {
  status: number;
  nth_number: number;
}

export const addCompanionRecord = async (data: companionData) => {
  const companion = new companionDevicesModel(data);
  return await companion.save();
};

export const getNextCompanionNumber = async (user_id: string) => {
  const userId = createObjectId(user_id);
  const result = await companionDevicesModel.aggregate([
    { $match: { user_id: userId } },
    {
      $group: {
        _id: null,
        inactiveNumbers: {
          $push: {
            $cond: {
              if: { $eq: ["$status", 0] },
              then: "$nth_number",
              else: null,
            },
          },
        },
        maxActiveNumber: {
          $max: {
            $cond: {
              if: { $eq: ["$status", 1] },
              then: "$nth_number",
              else: null,
            },
          },
        },
      },
    },
    {
      $project: {
        minInactive: {
          $min: {
            $filter: {
              input: "$inactiveNumbers",
              as: "num",
              cond: { $ne: ["$$num", null] },
            },
          },
        },
        maxActive: { $ifNull: ["$maxActiveNumber", 0] },
      },
    },
    {
      $project: {
        nth_number: {
          $cond: {
            if: { $ne: ["$minInactive", null] },
            then: "$minInactive",
            else: { $add: ["$maxActive", 1] },
          },
        },
        status: {
          $cond: {
            if: { $ne: ["$minInactive", null] },
            then: 0,
            else: 1,
          },
        },
      },
    },
  ]);

  if (result.length === 0) {
    return { status: 1, nth_number: 1 };
  }

  return result[0];
};

export const updateCompanionByNthNumber = async (
  user_id: string,
  nth_number: string,
  data: companionData
) => {
  // check the status of selected companion device and only update if it is zero
  const device = await companionDevicesModel.findOne({ user_id, nth_number });
  if (device?.status !== 0) {
    return null;
  }
  const result = await companionDevicesModel.updateOne(
    { user_id, nth_number },
    { ...data, status: 1 }
  );
  return result;
};

export const getUserCompanions = async (user_id: string) => {
  const result = await companionDevicesModel.find({
    user_id: createObjectId(user_id),
  });
  return result;
};
