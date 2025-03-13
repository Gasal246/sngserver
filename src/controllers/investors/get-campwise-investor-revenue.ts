import { formatResponse } from "../../helpers";
import { Request, Response } from "express";
import { getInvestorAssignedCampsList, isInvestorAssignedToCamp } from "../../services/investor_assign_camps";
import { getRevenuePercentWithinDate, getRevenueScheduleInvestorCamp, investorRevenueSchedulesForServiceId } from "../../services/investor_revenue_schedule";
import { getInvestorServiceOfCamp } from "../../services/investor_assign_services";
import { getCampTransactionsWithinDates, getServiceBasedTransactionsOfCamp, getTransactionsOfClientWithinDates } from "../../services/user_transactions";
import { getInvestorByIdOnly } from "../../services/investors";
import { getCampById } from "../../services/camp";

export const getInvestorCampWiseRevenue = async (req: Request | any, res: Response) => {
    try {
        const { investorId, sd, ed, status }: any = req.query;
        // console.log(req.query)
        // const token_data = req?.decodedToken?.data;

        // if(token_data && investorId !== token_data.id) {
        //     const data = formatResponse(406, true, "Unauthorized access", null);
        //     res.status(406).json(data);
        //     return;
        // }

        const investor = await getInvestorByIdOnly(investorId);
        if(!investor || investor?.status == 0) {
            const data = formatResponse(406, true, "Investor not found", null);
            res.status(406).json(data);
            return;
        }

        const getTransactions = await getTransactionsOfClientWithinDates(new Date(sd), new Date(ed || new Date()), investor.client_id!.toString());

        const assignedCamps = await getInvestorAssignedCampsList(investorId, status || 'active');

        const camps = assignedCamps.map(camp => camp.camp_data);

        let obj = [];
        for (const camp of camps) {
            const transactions = getTransactions.filter((transaction: any) => transaction.campId.equals(camp._id));
            let result: any[] = []
            await Promise.all(transactions.map(async (transaction: any) => {
                const revenue_percent = await getRevenuePercentWithinDate(investorId, transaction.createdAt as Date);
                const revenue = (transaction.revenue || 0) * (revenue_percent as number / 100);
                result.push({
                    ...transaction?._doc,
                    investor_revenue: revenue,
                    revenue_percent
                });
            }));

            const total_revenue = result.reduce((sum, transaction: any) => sum + (transaction.investor_revenue || 0), 0);

            // Group transactions by revenue percentage
            const revenueCountMap: Record<number, { transactions: number, investor_revenue: number }> = {};

            result.forEach((transaction) => {
                const percentage = transaction.revenue_percent;
                if (!revenueCountMap[percentage]) {
                    revenueCountMap[percentage] = { transactions: 0, investor_revenue: 0 };
                }
                revenueCountMap[percentage].transactions += 1;
                revenueCountMap[percentage].investor_revenue += transaction.investor_revenue;
            });
        
            // Convert to required format
            const revenueDistribution = Object.entries(revenueCountMap).map(([percentage, data]) => ({
                percentage: Number(percentage),
                transactions: data.transactions,
                investor_revenue: data.investor_revenue,
                first_transaction_date: transactions[0]?.createdAt,
                last_transaction_date: transactions[transactions.length - 1]?.createdAt
            }));

            obj.push({
                camp,
                // transactions: result,
                transaction_count: result?.length,
                total_revenue,
                revenue_distribution: revenueDistribution || []
            });
        }

        const data = formatResponse(200, false, "Campwise revenue fetched successfully", {
            investor,
            camps: obj
        });
        res.status(200).json(data);
        return;
    } catch (error: any) {
        console.log(error);
        const data = formatResponse(500, true, error.message, null);
        res.status(500).json(data);
        return;
    }
};

export const getInvestorCampRevenue = async ( req: Request | any, res: Response ) => {
    try {
        const { investorId, sd, ed, status }: any = req.query;
        const campId = req.params.campId;
        const token_data = req.decodedToken.data

        const investor = await getInvestorByIdOnly(investorId);
        if(!investor || investor?.status == 0) {
            const data = formatResponse(405, true, "Investor not found", null);
            res.status(405).json(data);
            return;
        }

        if(investor?.id !== token_data?.id) {
            const data = formatResponse(406, true, "Authentication Error", null);
            res.status(406).json(data);
            return;
        }

        const camp = await getCampById(campId);
        if(!camp) {
            const data = formatResponse(405, true, "Camp not found", null);
            res.status(405).json(data);
            return;
        }

        const assignedServices = await getInvestorServiceOfCamp(investorId, campId, status);
        const camp_transactions = await getCampTransactionsWithinDates(investor?.client_id!.toString(), campId, new Date(sd), new Date(ed));

        const services: any[] = assignedServices.map(service => service?.service_id);

        let obj = [];
        for(const service of services) {
            const transactions = camp_transactions.filter((transaction: any) => transaction.serviceId.equals(service?._id));

            let result: any[] = [];
            await Promise.all(transactions.map(async (transaction: any) => {
                const revenue_percent = await getRevenuePercentWithinDate(investorId, transaction.createdAt as Date);
                const revenue = (transaction.revenue || 0) * (revenue_percent as number / 100);
                result.push({
                    ...transaction?._doc,
                    investor_revenue: revenue,
                    revenue_percent
                })
            }))

            const total_revenue = result.reduce((sum, transaction: any) => sum + (transaction.investor_revenue || 0), 0);

            // Revenue Grouping
            const revenueCountMap: Record<number, { transactions: number, investor_revenue: number }> = {};
            result.forEach((transaction) => {
                const percentage = transaction.revenue_percent;
                if (!revenueCountMap[percentage]) {
                    revenueCountMap[percentage] = { transactions: 0, investor_revenue: 0 };
                }
                revenueCountMap[percentage].transactions += 1;
                revenueCountMap[percentage].investor_revenue += transaction.investor_revenue;
            });
            const revenueDistribution = Object.entries(revenueCountMap).map(([percentage, data]) => ({
                percentage: Number(percentage),
                transactions: data.transactions,
                investor_revenue: data.investor_revenue,
                first_transaction_date: transactions[0]?.createdAt,
                last_transaction_date: transactions[transactions.length - 1]?.createdAt
            }));

            obj.push({
                service,
                transaction_count: result?.length,
                total_revenue,
                // transactions: result,
                revenue_distribution: revenueDistribution || []
            })
        }

        const data = formatResponse(200, false, "calculation successfull", {
            camp,
            services: obj
        });
        res.status(200).json(data);
        return;
    } catch (error: any) {
        const data = formatResponse(500, true, error.message, null);
        res.status(500).json(data);
        return;
    }
}
