import { createObjectId } from "../helpers";
import db from "../models";

const investorRevenueScheduleModel = db.investorRevenueScheduleModel;

interface ICreateRevenueSchedule {
  revenue_percent: number;
  service_id: string;
  start_date: Date;
  camp_id: string | null;
  investor_id: string | null;
  end_date?: Date;
}

export const createRevenueSchedule = async (data: ICreateRevenueSchedule) => {
  const newRevenueSchedule = new investorRevenueScheduleModel(data);
  const savedRevenueSchedule = await newRevenueSchedule.save();
  return savedRevenueSchedule;
};

export const investorRevenueSchedulesForServiceId = async (
  investor_id: string,
  service_id: string
) => {
  const result = await investorRevenueScheduleModel
    .find({
      investor_id: createObjectId(investor_id),
      service_id: createObjectId(service_id),
    })
    .populate("service_id");
  return result;
};

export const investorRevenueSchedulesForServiceIdAndCampId = async (
  investor_id: string,
  service_id: string,
  camp_id: string
) => {
  const result = await investorRevenueScheduleModel
    .find({
      investor_id: createObjectId(investor_id),
      service_id: createObjectId(service_id),
      camp_id: createObjectId(camp_id),
    })
    .populate("service_id");
  return result;
};

export const updateRevenueSchedule = async (
  id: string,
  data: ICreateRevenueSchedule
) => {
  const updatedRevenueSchedule =
    await investorRevenueScheduleModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  return updatedRevenueSchedule;
};

export const isRevenueScheduleAlreadyAssigned = async (
  investor_id: string,
  camp_id: string,
  service_id: string,
  revenue_percent: number
) => {
  const result = await investorRevenueScheduleModel.findOne({
    investor_id: createObjectId(investor_id),
    camp_id: createObjectId(camp_id),
    service_id: createObjectId(service_id),
    revenue_percent: revenue_percent,
  });
  return !!result;
};

export const maximumAllowedRevenuePercentage = async (
  camp_id: string,
  service_id: string
) => {
  const currentDate = new Date();
  const result = await investorRevenueScheduleModel.find({
    camp_id: createObjectId(camp_id),
    service_id: createObjectId(service_id),
    $or: [{ end_date: { $gt: currentDate } }, { end_date: null }],
  });
  const totalRevenuePercentage = result.reduce(
    (sum, item: any) => sum + item.revenue_percent,
    0
  );
  return 100 - totalRevenuePercentage;
};

export const getInvestorRevenueScheduleList = async (
  investor_id: string,
  camp_id: string,
  service_id: string
) => {
  const result = await investorRevenueScheduleModel.find({
    investor_id: createObjectId(investor_id),
    camp_id: createObjectId(camp_id),
    service_id: createObjectId(service_id),
  });
  return result;
};

export const getRevenueScheduleById = async (id: string) => {
  const result = await investorRevenueScheduleModel.findById(
    createObjectId(id)
  );
  return result;
};

export const getRevenueScheduleByInvestorId = async (investor_id: string) => {
  const result = await investorRevenueScheduleModel.find({
    investor_id: createObjectId(investor_id),
  });
  return result;
};

export const getRevenueScheduleInvestorCamp = async (
  investor_id: string,
  camp_id: string
) => {
  const result = await investorRevenueScheduleModel.find({
    investor_id: createObjectId(investor_id),
    camp_id: createObjectId(camp_id),
  });
  return result;
};

export const getRevenuePercentWithinDate = async (
  investor_id: string,
  date: Date
) => {
  const result = await investorRevenueScheduleModel.findOne({
    investor_id: createObjectId(investor_id),
    start_date: { $lte: date },
    end_date: { $gte: date },
  });
  return result?.revenue_percent || 0;
};
