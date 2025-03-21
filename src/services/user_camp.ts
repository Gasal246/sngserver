import { createObjectId } from "../helpers";
import db from "../models";
import { IUserCamp } from "../models/user_camp.model";
import { ObjectID } from "../types/interfaces";

const userCampModel = db.userCampModel;

export const assignUserToCamp = async (obj: IUserCamp): Promise<IUserCamp> => {
  return await userCampModel.create(obj);
};

export const isCampAssignedToUser = async (
  camp_id: string
): Promise<IUserCamp | null> => {
  const result = await userCampModel.findOne({ camp_id: camp_id, status: 1 });
  return result;
};

export const getAssignCampDetailsOfUser = async (
  user_id: string
): Promise<IUserCamp | null> => {
  const result = await userCampModel.findOne({ user_id: user_id, status: 1 });
  return result;
};

export const deactivateBaseCamp = async (id: ObjectID): Promise<void> => {
  await userCampModel.updateOne({ _id: id }, { status: 2 });
};

export const getBaseCampDetailsFromUser = async (
  user_id: string
): Promise<ObjectID | null> => {
  const result = await userCampModel.aggregate([
    {
      $match: { user_id: createObjectId(user_id), status: 1 },
    },
    {
      $lookup: {
        from: "camps",
        localField: "camp_id",
        foreignField: "_id",
        as: "camp",
        pipeline: [
          {
            $match: {
              status: 1,
            },
          },
          {
            $project: {
              campId: "$_id",
              _id: 0,
              camp_name: 1,
              camp_address: 1,
              camp_city: 1,
              router_primary_ip: 1,
              no_of_allowed_user: 1,
              no_of_allowed_kiosk: 1,
              no_of_allowed_account: 1,
              no_of_allowed_coordinators: 1,
              is_allowed_package_meal: 1,
              is_allowed_package_water: 1,
              is_allowed_package_internet: 1,
              router_mac_address: 1,
              router_ssid: 1,
              router_secondary_ip: 1,
              router_pass: 1,
              router_secret: 1,
              router_alias: 1,
              router_hostname: 1,
              camp_uuid: 1,
              client_id: 1,
              status: 1,
            },
          },
        ],
      },
    },

    { $unwind: "$camp" },
    {
      $project: {
        campAssignUserId: "$_id",
        _id: 0,
        user_id: 1,
        camp_id: 1,
        client_id: 1,
        status: 1,
        camp: 1,
      },
    },
  ]);
  if (!result || !result.length) {
    return null;
  }

  return result[0];
};

export const getCampUsers = async (camp_id: string): Promise<IUserCamp[]> => {
  const result = await userCampModel.aggregate([
    {
      $match: { camp_id: createObjectId(camp_id), status: 1 },
    },
    {
      $lookup: {
        from: "user_registers",
        localField: "user_id",
        foreignField: "_id",
        as: "user_data",
        pipeline: [
          {
            $match: { status: 1 },
          },
          {
            $addFields: {
              id: "$_id",
            },
          },
          {
            $project: {
              _id: 0,
              id: 1,
              name: 1,
              email: 1,
              phone: 1,
              status: 1,
              block: 1,
              block_building: 1,
              floor_no: 1,
              building_no: 1,
              room_no: 1,
              client_id: 1,
              gender: 1,
              company_name: 1,
              job_title: 1,
              uuid: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$user_data",
    },
    {
      $project: {
        _id: 0,
        campAssignUserId: 1,
        user_id: 1,
        camp_id: 1,
        client_id: 1,
        status: 1,
        camp: 1,
        user_data: 1,
      },
    },
  ]);
  return result;
};
