import { createObjectId } from "../helpers";
import db from "../models";

const serviceModal = db.servicesModel;

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
