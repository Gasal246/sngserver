import db from "../models";

const serviceModal = db.servicesModel;

export const isServiceNameExist = async (name: string) => {
  const result = await serviceModal.findOne({ service_name: name });
  return !!result;
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
