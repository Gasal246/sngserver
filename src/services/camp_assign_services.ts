import { ObjectId } from "mongoose";
import { createObjectId } from "../helpers";
import db from "../models";
import { ICamp_assign_services } from "../models/camp_assign_services.model";
import camp from "../routes/camp";
import { Obj, ObjectID } from "../types/interfaces";

const campAssignServicesModel = db.campAssignServicesModel;

export const getServiceListOfCampIds = async (
  camp_ids: string[],
  status: number
) => {
  const filter: Obj = {
    camp_id: {
      $in: camp_ids,
    },
    status: status,
  };

  const result = await campAssignServicesModel
    .find(filter)
    .populate({
      path: "service_id",
    })
    .populate({
      path: "camp_id",
      select: {
        camp_name: 1,
        camp_address: 1,
        camp_city: 1,
      },
    });
  return result;
};

export const assignNewCampService = async (
  client_id: string,
  camp_id: string,
  service_id: string
) => {
  const newAssignData = new campAssignServicesModel({
    client_id: createObjectId(client_id),
    camp_id: createObjectId(camp_id),
    service_id: createObjectId(service_id),
    status: 1,
  });
  const result = await newAssignData.save();
  return result;
};

export const isAlreadyAssigned = async (
  camp_id: string,
  service_id: string
) => {
  const result = await campAssignServicesModel.findOne({
    camp_id: createObjectId(camp_id),
    service_id: createObjectId(service_id),
  });
  return !!result;
};

export const isCampAssignServiceAlreadyExistById = async (id: string) => {
  const result = await campAssignServicesModel.findById(createObjectId(id));
  return !!result;
};

export const changeStatusOfService = async (id: string, status: number) => {
  const result = await campAssignServicesModel.findByIdAndUpdate(
    createObjectId(id),
    { status: status },
    { new: true }
  );
  return result;
};

export const getServiceAssignedCamps = async (
  service_id: string,
  status?: string
) => {
  const result = await campAssignServicesModel
    .find({
      service_id: createObjectId(service_id),
      status: parseInt(status || "1"),
    })
    .populate("camp_id");
  return result;
};

export const getCampsAssignedToService = async (
  service_id: string,
  client_id: string
) => {
  const result = await campAssignServicesModel
    .find({
      service_id: createObjectId(service_id),
      client_id: createObjectId(client_id),
      status: 1,
    })
    .populate("camp_id");
  return result;
};

export const getDistinctServiceByCampIds = async (camp_ids: ObjectID[]) => {
  const result = await campAssignServicesModel.aggregate([
    { $match: { camp_id: { $in: camp_ids } } }, // Match camp_ids in the given array
    { $group: { _id: "$service_id" } }, // Get distinct service_ids
    {
      $lookup: {
        from: "services",
        localField: "_id",
        foreignField: "_id",
        as: "serviceDetails",
      },
    },
    { $unwind: "$serviceDetails" },
    { $project: { serviceDetails: 1, _id: 0 } },
  ]);
  return result;
};

export const getServicesByAttachedCampId = async (camp_id: string) => {
  const result = await campAssignServicesModel
    .find({
      camp_id: createObjectId(camp_id),
    })
    .populate("service_id");
  return result;
};

export const getCampsByAttachedServiceId = async (service_id: string) => {
  const result = await campAssignServicesModel
    .find({
      service_id: createObjectId(service_id),
    })
    .populate("camp_id");
  return result;
};
