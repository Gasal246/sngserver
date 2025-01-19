"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expireClientSubscriptionCron = exports.expireInternetPackageCron = void 0;
const cron_1 = require("cron");
const services_1 = require("../services");
const _1 = require(".");
const enums_1 = require("../types/enums");
const client_1 = require("../services/client");
//Every minute
exports.expireInternetPackageCron = new cron_1.CronJob("*/1 * * * *", async () => {
    await expireInternetPackage();
});
//Everyday midnight
exports.expireClientSubscriptionCron = new cron_1.CronJob("0 0 * * *", async () => {
    await expireClientSubscription();
});
async function expireClientSubscription() {
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    const clients = await (0, client_1.getExpireSubscriptionClient)(date);
    if (!clients || !clients.length) {
        return;
    }
    const promises = [];
    for (const client of clients) {
        promises.push(services_1.clientService.updateStatus(client._id.toString(), 3));
    }
    await Promise.all(promises);
}
async function expireInternetPackage() {
    const time = new Date();
    time.setSeconds(0);
    time.setMilliseconds(0);
    const orders = await services_1.orderInternetPackageService.getExpireInternetPackage(time);
    if (!orders || !orders.length) {
        return;
    }
    const promises = [];
    for (const order of orders) {
        //Expire current package
        promises.push(services_1.orderInternetPackageService.expireInternetPackage(order._id));
        //Active upcoming package
        const upcomingPlan = await services_1.orderInternetPackageService.getUpcomingPendingPlanOfUser(order.user_id);
        if (upcomingPlan) {
            const starDate = new Date();
            const expireDate = new Date(starDate.getTime());
            expireDate.setTime(expireDate.getTime() + (0, _1.minuteInMilleSeconds)(upcomingPlan.duration));
            const updateData = {
                package_start_date: starDate,
                package_expiry_date: expireDate,
                order_status: enums_1.OrderStatus.active,
            };
            promises.push(services_1.orderInternetPackageService.updateInternetPackage(upcomingPlan._id, updateData));
        }
    }
    await Promise.all(promises);
}
//# sourceMappingURL=cronJob.js.map