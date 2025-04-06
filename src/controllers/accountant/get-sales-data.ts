import { Request, Response } from "express";
import { createObjectId, formatResponse } from "../../helpers";
import { getCampByAccountant } from "../../services/camp_assign_accountant";
import {
  getServiceIdTransactionWithinDates,
  getTransactionsByCampIdsWithinDate,
} from "../../services/user_transactions";
import { getAccountantById } from "../../services/accountant";
import {
  getCampsByAttachedServiceId,
  getServicesByAttachedCampId,
} from "../../services/camp_assign_services";

export const getSalesData = async (req: Request | any, res: Response) => {
  try {
    const { sd: start_date, ed: end_date, status } = req.query;
    const accountatId = req.decodedToken?.data?.id;
    const accountant = await getAccountantById(
      accountatId,
      req.decodedToken?.data?.client_id
    );
    if (!accountant) {
      const data = formatResponse(400, true, "Accountant not found", null);
      res.status(400).json(data);
      return;
    }

    const accountant_camps = await getCampByAccountant(
      createObjectId(accountatId),
      status ? status + "" : "1"
    );
    if (!accountant_camps || !accountant_camps.length) {
      const data = formatResponse(
        400,
        true,
        "Accountant is not assigned to any camp.",
        null
      );
      res.status(400).json(data);
      return;
    }

    const campIds = accountant_camps.map((camp) =>
      createObjectId(camp.camp_id)
    );

    const transactions = await getTransactionsByCampIdsWithinDate(
      campIds,
      new Date(start_date),
      new Date(end_date)
    );

    let obj: any[] = [];

    for (const camp of accountant_camps) {
      const campTransactions = transactions.filter((transaction: any) =>
        transaction?.campId?.equals(camp?.camp_id)
      );
      const campsSalesTotal = campTransactions.reduce(
        (sum: number, transaction: any) =>
          sum + (transaction?.sales_amount || 0),
        0
      );

      // service grouping and formating...
      const serviceCountMap: Record<
        string,
        { service_id: string; service_name: string; total_sales_amount: number }
      > = {};
      campTransactions.forEach((transaction: any) => {
        const serviceId = transaction?.serviceId?._id?.toString();
        if (serviceCountMap[serviceId]) {
          serviceCountMap[serviceId].total_sales_amount +=
            transaction?.sales_amount || 0;
        } else {
          serviceCountMap[serviceId] = {
            service_id: serviceId,
            service_name: transaction?.serviceId?.service_name,
            total_sales_amount: transaction?.sales_amount || 0,
          };
        }
      });

      obj.push({
        camp_id: camp?.camp_id,
        camp_name: camp?.camp?.camp_name,
        assign_status: camp?.status,
        camp_status: camp?.camp?.status,
        camp_city: camp?.camp?.camp_city,
        total_sales_amount: campsSalesTotal,
        services: Object.values(serviceCountMap),
      });
    }

    const data = formatResponse(
      200,
      false,
      "Sales data fetched successfully",
      obj
    );
    res.status(200).json(data);
    return;
  } catch (error: any) {
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
};

export const getCampSalesData = async (req: Request | any, res: Response) => {
  try {
    const { sd: start_date, ed: end_date, campId } = req.query;
    const transactions = await getTransactionsByCampIdsWithinDate(
      [createObjectId(campId)],
      new Date(start_date),
      new Date(end_date)
    );

    const campAssignedServices = await getServicesByAttachedCampId(campId);

    const serviceCountMap: Record<
      string,
      {
        service_id: string;
        service_name: string;
        service_status: number;
        assign_status: number;
        total_sales_amount: number;
      }
    > = {};
    campAssignedServices.forEach((service: any) => {
      serviceCountMap[service.service_id?._id?.toString()] = {
        service_id: service.service_id?._id?.toString(),
        service_name: service?.service_id?.service_name,
        service_status: service?.service_id?.status,
        assign_status: service?.status,
        total_sales_amount: 0,
      };
    });

    transactions.forEach((transaction: any) => {
      const serviceId = transaction?.serviceId?._id?.toString();
      if (serviceCountMap[serviceId]) {
        serviceCountMap[serviceId].total_sales_amount +=
          transaction?.sales_amount || 0;
      }
    });

    const data = formatResponse(
      200,
      false,
      "Sales data fetched successfully",
      Object.values(serviceCountMap)
    );
    res.status(200).json(data);
    return;
  } catch (error: any) {
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
};

export const getServiceSalesData = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { sd: start_date, ed: end_date, serviceId } = req.query;
    const accountantClientId = req.decodedToken?.data?.client_id;

    const transactions = await getServiceIdTransactionWithinDates(
      accountantClientId,
      serviceId,
      new Date(start_date),
      new Date(end_date)
    );

    const ServiceCamps = await getCampsByAttachedServiceId(serviceId);

    const campCountMap: Record<
      string,
      {
        camp_id: string;
        camp_name: string;
        camp_city: string;
        camp_status: number;
        assign_status: number;
        total_sales_amount: number;
      }
    > = {};
    ServiceCamps.forEach((camp: any) => {
      campCountMap[camp.camp_id?._id?.toString()] = {
        camp_id: camp.camp_id?._id?.toString(),
        camp_name: camp?.camp_id?.camp_name,
        camp_city: camp?.camp_id?.camp_city,
        camp_status: camp?.camp_id?.status,
        assign_status: camp?.status,
        total_sales_amount: 0,
      };
    });

    transactions.forEach((transaction: any) => {
      const campId = transaction?.campId?._id?.toString();
      if (campCountMap[campId]) {
        campCountMap[campId].total_sales_amount +=
          transaction?.sales_amount || 0;
      }
    });

    const data = formatResponse(
      200,
      false,
      "Sales data fetched successfully",
      Object.values(campCountMap)
    );
    res.status(200).json(data);
    return;
  } catch (error: any) {
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
};
