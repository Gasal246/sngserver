import { createObjectId } from "../helpers";
import db from "../models";

const serviceModal = db.servicesModel;
const clientAssignServices = db.clientAssignServices;

export const isServiceNameExist = async (name: string) => {
  const result = await serviceModal.findOne({ service_name: name });
  return !!result;
};

export const isServiceExist = async (id: string) => {
  const result = await serviceModal.findById(createObjectId(id));
  return result;
};

export const addNewService = async (
  service_name: string,
  transaction_title: string
) => {
  const newService = new serviceModal({
    service_name,
    transaction_title,
  });
  const result = await newService.save();
  return result;
};

export const getAllSuperadminServices = async (status?: any) => {
  const stat = status ? parseInt(status) : 1;
  const result = await serviceModal.find({ status: stat });
  return result;
};

export const updateServiceByName = async (service_name: any, obj: any) => {
  const result = await serviceModal.findOneAndUpdate(
    { service_name: service_name },
    obj,
    { new: true }
  );
  return result;
};

export const updateServiceById = async (service_id: any, obj: any) => {
  const result = await serviceModal.findByIdAndUpdate(
    createObjectId(service_id),
    obj,
    { new: true }
  );
  return result;
};

export const changeServiceStatusById = async (id: string, status: 0 | 1) => {
  const result = await serviceModal.findByIdAndUpdate(
    createObjectId(id),
    { status: status },
    { new: true }
  );
  return result;
};

export const getClientServicesList = async (
  client_id: string,
  status: number
) => {
  const result = await clientAssignServices.aggregate([
    {
      $match: {
        client_id: createObjectId(client_id),
        status,
      },
    },
    {
      $lookup: {
        from: "clients",
        localField: "client_id",
        foreignField: "_id",
        as: "client",
        pipeline: [
          {
            $addFields: {
              id: "$_id",
            },
          },
          {
            $project: {
              _id: 0,
              id: 1,
              full_name: 1,
              email: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$client",
      },
    },
    {
      $lookup: {
        from: "services",
        localField: "service_id",
        foreignField: "_id",
        as: "service",
      },
    },
    {
      $unwind: {
        path: "$service",
      },
    },
  ]);
  return result;
};

export const isServiceAlreadyAttached = async (
  client_id: string,
  service_id: string
) => {
  const result = await clientAssignServices.findOne({
    client_id: createObjectId(client_id),
    service_id: createObjectId(service_id),
  });
  return !!result;
};

export const attachServiceToClientFuncion = async (
  client_id: string,
  service_id: string
) => {
  const newAttachData = new clientAssignServices({
    client_id: createObjectId(client_id),
    service_id: createObjectId(service_id),
    status: 1,
  });
  const result = await newAttachData.save();
  return result;
};

export const changeStatusOfService = async (id: string, status: number) => {
  const result = await clientAssignServices.findByIdAndUpdate(
    createObjectId(id),
    { status },
    { new: true }
  );
  return result;
};

export const getServiceById = async (id: string) => {
  const result = await serviceModal.findById(createObjectId(id));
  return result;
};

interface SERVICE_NAMES {
  MEMBERSHIP: "Membership";
  SMART_WASH: "Smart Wash";
  WATER: "Water Plus";
}

export const getServiceByName = async (
  name: SERVICE_NAMES[keyof SERVICE_NAMES]
) => {
  const result = await serviceModal.findOne({ service_name: name });
  return result;
};
