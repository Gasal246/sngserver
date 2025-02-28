import { createObjectId } from "../helpers";
import db from "../models";

const investorAssignServicesModel = db.investorAssignServicesModel;

export const createInvestorAssignService = async (
  investor_id: string,
  service_id: string,
  camp_id: string
) => {
  const newData = new investorAssignServicesModel({
    investor_id: createObjectId(investor_id),
    service_id: createObjectId(service_id),
    camp_id: createObjectId(camp_id),
  });
  const savedData = await newData.save();
  return savedData;
};

export const isInvestorServiceAlreadyAssigned = async (
  investor_id: string,
  service_id: string,
  camp_id: string
) => {
  const alreadyAdded = await investorAssignServicesModel.findOne({
    investor_id: createObjectId(investor_id),
    service_id: createObjectId(service_id),
    camp_id: createObjectId(camp_id),
  });
  if (alreadyAdded) return true;
  return false;
};

export const getInvestorServiceOfCamp = async (
  investor_id: string,
  camp_id: string,
  status?: string
) => {
  const result = await investorAssignServicesModel
    .find({
      investor_id: createObjectId(investor_id),
      camp_id: createObjectId(camp_id),
      status: parseInt(status || "1"),
    })
    .populate("service_id");
  return result;
};

export const investorAssignServiceChangeStatus = async (
  id: string,
  status: number
) => {
  const result = await investorAssignServicesModel.findByIdAndUpdate(
    createObjectId(id),
    { status: status },
    { new: true }
  );
  return result;
};
