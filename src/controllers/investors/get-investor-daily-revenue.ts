import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import { getRevenueScheduleByInvestorId } from "../../services/investor_revenue_schedule";
import { getAllInvestorAssignedServices } from "../../services/investor_assign_services";
import { getUserTransactionsWithStartAndEndDateIncludingServiceId } from "../../services/user_transactions";
import moment from "moment";

export const getInvestorDailyRevenue = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { investor_id } = req.body;

    // manually finding the last 30 days revenue.
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const revenueSchedules = await getRevenueScheduleByInvestorId(investor_id);
    if (revenueSchedules?.length === 0) {
      const data = formatResponse(
        400,
        true,
        "No revenue schedules found.",
        null
      );
      res.status(400).json(data);
      return;
    }

    const investorServices = await getAllInvestorAssignedServices(investor_id);
    if (investorServices?.length === 0) {
      const data = formatResponse(400, true, "No Services Assinged.", null);
      res.status(400).json(data);
      return;
    }
    const serviceIds =
      investorServices.map((service) => service.service_id?.toString()) || [];

    const transactions =
      await getUserTransactionsWithStartAndEndDateIncludingServiceId(
        thirtyDaysAgo,
        today,
        serviceIds as string[]
      );

    const dailyRevenueMap = new Map();
    for (const transaction of transactions) {
      const transactionDate = moment(transaction.createdAt).format(
        "YYYY-MM-DD"
      );

      // Find a matching revenue schedule for this transaction
      const matchingSchedule = revenueSchedules.find((schedule: any) => {
        const matchesService = schedule.service_id.equals(
          transaction.serviceId
        );
        const matchesCamp = schedule.camp_id
          ? schedule.camp_id.equals(transaction.campId)
          : true;
        const withinDateRange =
          (!schedule.start_date ||
            transaction.createdAt >= schedule.start_date) &&
          (!schedule.end_date || transaction.createdAt <= schedule.end_date);
        return matchesService && matchesCamp && withinDateRange;
      });

      if (matchingSchedule) {
        // investor's revenue for this transaction
        const investorRevenue =
          ((matchingSchedule.revenue_percent as number) / 100) *
          (transaction.amount as number);

        // aggregating revenue by date
        if (dailyRevenueMap.has(transactionDate)) {
          dailyRevenueMap.set(
            transactionDate,
            dailyRevenueMap.get(transactionDate) + investorRevenue
          );
        } else {
          dailyRevenueMap.set(transactionDate, investorRevenue);
        }
      }
    }

    // convert the daily revenue map to the desired output format
    const result = Array.from(dailyRevenueMap.entries()).map(
      ([date, investor_revenue]) => ({
        date,
        investor_revenue: parseFloat(investor_revenue.toFixed(2)),
      })
    );

    // Sort by date for consistency
    result.sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const data = formatResponse(
      200,
      true,
      "Daily Service Data Fetched",
      result
    );
    res.status(200).json(data);
    return;
  } catch (error: any) {
    const data = formatResponse(500, true, error.message, null);
    res.status(500).json(data);
    return;
  }
};
