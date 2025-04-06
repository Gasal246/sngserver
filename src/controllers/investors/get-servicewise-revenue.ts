import { formatResponse } from "../../helpers";
import { Request, Response } from "express";
import { getInvestorByIdOnly } from "../../services/investors";
import { getAllInvestorAssignedServices } from "../../services/investor_assign_services";
import {
  getServiceIdTransactionWithinDates,
  getTransactionsOfClientWithinDates,
} from "../../services/user_transactions";
import { getRevenuePercentWithinDate } from "../../services/investor_revenue_schedule";
import { getServiceById } from "../../services/services";
import { getServiceAssignedCamps } from "../../services/camp_assign_services";

export const getInvestorServiceWiseRevenue = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { investorId, sd, ed, status }: any = req.query;

    // const token_data = req?.decodedToken?.data;

    // if(token_data && investorId !== token_data.id) {
    //     const data = formatResponse(406, true, "Unauthorized access", null);
    //     res.status(406).json(data);
    //     return;
    // }

    const investor = await getInvestorByIdOnly(investorId);
    if (!investor || investor?.status == 0) {
      const data = formatResponse(406, true, "Investor not found", null);
      res.status(406).json(data);
      return;
    }

    const investorAssignedServices = await getAllInvestorAssignedServices(
      investorId,
      status ? parseInt(status) : undefined
    );

    const serviceIds =
      investorAssignedServices.map(
        (service: any) => service?.service_id?._id?.toString() || ""
      ) || [];

    const transactions = await getTransactionsOfClientWithinDates(
      new Date(sd),
      new Date(ed || new Date()),
      investor.client_id!.toString()
    );

    const filteredTransactions = transactions.filter((transaction) =>
      serviceIds.includes(transaction?.serviceId?.toString() || "")
    );

    const services: any = investorAssignedServices.map(
      (service) => service?.service_id
    );

    const obj = [];

    for (const service of services) {
      const transactions = filteredTransactions.filter((transaction: any) =>
        transaction?.serviceId?.equals(service?._id)
      );
      let result: any[] = [];
      await Promise.all(
        transactions.map(async (transaction: any) => {
          const revenue_percent = await getRevenuePercentWithinDate(
            investorId,
            transaction.createdAt as Date
          );
          const revenue =
            (transaction.revenue || 0) * ((revenue_percent as number) / 100);
          result.push({
            ...transaction?._doc,
            investor_revenue: revenue,
            revenue_percent,
          });
        })
      );
      const total_revenue = result.reduce(
        (sum, transaction: any) => sum + (transaction.investor_revenue || 0),
        0
      );

      // Grouping the transactions by revenue percentage
      const revenueCountMap: Record<
        number,
        { transactions: number; investor_revenue: number }
      > = {};
      result.forEach((transaction) => {
        const percentage = transaction.revenue_percent;
        if (!revenueCountMap[percentage]) {
          revenueCountMap[percentage] = {
            transactions: 0,
            investor_revenue: 0,
          };
        }
        revenueCountMap[percentage].transactions += 1;
        revenueCountMap[percentage].investor_revenue +=
          transaction.investor_revenue;
      });

      // Convert to required format
      const revenueDistribution = Object.entries(revenueCountMap).map(
        ([percentage, data]) => ({
          percentage: Number(percentage),
          transactions: data.transactions,
          investor_revenue: data.investor_revenue,
          first_transaction_date: result[0]?.createdAt,
          last_transaction_date: result[result.length - 1]?.createdAt,
        })
      );

      obj.push({
        service,
        // transactions: result,
        transaction_count: result?.length,
        total_revenue,
        revenue_distribution: revenueDistribution,
      });
    }

    const data = formatResponse(
      200,
      false,
      "Servicewise revenue fetched successfully",
      {
        investor,
        services: obj,
      }
    );
    res.status(200).json(data);
    return;
  } catch (error: any) {
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
};

export const getInvestorServiceRevenue = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { investorId, sd, ed, status }: any = req.query;
    const serviceId = req.params.serviceId;
    const token_data = req?.decodedToken?.data;

    const investor = await getInvestorByIdOnly(investorId);
    if (!investor || investor?.status == 0) {
      const data = formatResponse(405, true, "Investor not found", null);
      res.status(405).json(data);
      return;
    }

    if (token_data && investor?.id !== token_data?.id) {
      const data = formatResponse(406, true, "Authentication Error", null);
      res.status(406).json(data);
      return;
    }

    const service = await getServiceById(serviceId);
    if (!service) {
      const data = formatResponse(405, true, "Service not found", null);
      res.status(405).json(data);
      return;
    }

    const assignedCamps = await getServiceAssignedCamps(serviceId, status);
    const camps = assignedCamps.map((camp: any) => camp?.camp_id);

    const user_transactions = await getServiceIdTransactionWithinDates(
      investor.client_id!.toString(),
      serviceId,
      new Date(sd),
      new Date(ed || new Date())
    );

    let obj: any[] = [];

    for (const camp of camps) {
      const transactions = user_transactions.filter((transaction: any) =>
        transaction?.campId?.equals(camp?._id)
      );

      let result: any[] = [];
      await Promise.all(
        transactions.map(async (transaction: any) => {
          const revenue_percent = await getRevenuePercentWithinDate(
            investorId,
            transaction.createdAt as Date
          );
          const revenue =
            (transaction.revenue || 0) * ((revenue_percent as number) / 100);
          result.push({
            ...transaction?._doc,
            investor_revenue: revenue,
            revenue_percent,
          });
        })
      );

      const total_revenue = result.reduce(
        (sum, transaction: any) => sum + (transaction.investor_revenue || 0),
        0
      );

      // Revenue Grouping
      const revenueCountMap: Record<
        number,
        { transactions: number; investor_revenue: number }
      > = {};
      result.forEach((transaction) => {
        const percentage = transaction.revenue_percent;
        if (!revenueCountMap[percentage]) {
          revenueCountMap[percentage] = {
            transactions: 0,
            investor_revenue: 0,
          };
        }
        revenueCountMap[percentage].transactions += 1;
        revenueCountMap[percentage].investor_revenue +=
          transaction.investor_revenue;
      });
      const revenueDistribution = Object.entries(revenueCountMap).map(
        ([percentage, data]) => ({
          percentage: Number(percentage),
          transactions: data.transactions,
          investor_revenue: data.investor_revenue,
          first_transaction_date: result[0]?.createdAt,
          last_transaction_date: result[result.length - 1]?.createdAt,
        })
      );

      obj.push({
        camp,
        transaction_count: result?.length,
        total_revenue,
        revenue_distribution: revenueDistribution || [],
      });
    }

    const data = formatResponse(
      200,
      false,
      "Campwise revenue fetched successfully",
      {
        service,
        camps: obj,
      }
    );
    res.status(200).json(data);
    return;
  } catch (error: any) {
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
};
