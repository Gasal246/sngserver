import { Request, Response } from "express";
import {
  Message,
  createObjectId,
  formatResponse,
  generateRandomPackageCode,
  minuteInMilleSeconds,
} from "../../helpers";
import { isValidObjectId } from "mongoose";
import {
  internetPackageClientService,
  orderInternetPackageService,
  userCampService,
  userWalletService,
} from "../../services";
import db from "../../models";
import { OrderStatus, CreatedByUserType } from "../../types/enums";
import { addNewTransaction } from "../../services/user_transactions";
import { getClientByIdWithoutStatus } from "../../services/client";
import { getServiceById } from "../../services/services";

export const userPlaceInternetOrder = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  try {
    const userData = req.decodedToken.data;
    if (!userData.location_camp.location_verified) {
      const data = formatResponse(400, true, Message.OUT_OF_SERVICE_AREA, null);
      res.status(400).json(data);
      return;
    }

    const assignCampDetails = await userCampService.getAssignCampDetailsOfUser(
      userData.id
    );
    if (!assignCampDetails) {
      const data = formatResponse(
        400,
        true,
        "User not assigned to any camp.",
        null
      );
      res.status(400).json(data);
      return;
    }

    if (!isValidObjectId(req.body.package_id)) {
      const data = formatResponse(400, true, "Package not found.", null);
      res.status(400).json(data);
      return;
    }

    const packageData =
      await internetPackageClientService.getInternetPackageFromCampAndPackageId(
        createObjectId(userData.location_camp.location_camp_id),
        createObjectId(req.body.package_id)
      );
    if (!packageData) {
      const data = formatResponse(400, true, "Package not available.", null);
      res.status(400).json(data);
      return;
    }

    const wallet = await userWalletService.walletAvailableForUserAndClient(
      userData.location_camp.location_camp_client_id,
      userData.id
    );
    if (!wallet) {
      const data = formatResponse(
        400,
        true,
        Message.INSUFFICIENT_BALANCE,
        null
      );
      res.status(400).json(data);
      return;
    }

    const orderPrice = packageData.package_sales_price;
    if (orderPrice > wallet.wallet_amount) {
      const data = formatResponse(
        400,
        true,
        Message.INSUFFICIENT_BALANCE,
        null
      );
      res.status(400).json(data);
      return;
    }

    const activeInternetPackage =
      await orderInternetPackageService.activeInternetPackageForUser(
        userData.id
      );

    const order = new db.orderInternetPackageModel();
    order.order_number = generateRandomPackageCode();
    order.user_id = createObjectId(userData.id);
    order.package_id = createObjectId(req.body.package_id);
    order.package_name = packageData.internet_package_client.package_name;
    order.package_code = packageData.internet_package_client.package_code;
    order.package_speed = packageData.internet_package_client.package_speed;
    order.package_amount = orderPrice;
    const originalInternetPackage =
      packageData.internet_package_client.internet_package;
    order.duration = originalInternetPackage.duration;
    order.volume = originalInternetPackage.volume;
    order.download_bandwidth = packageData.download_bandwidth;
    order.upload_bandwidth = packageData.upload_bandwidth;
    order.package_type = originalInternetPackage.type;
    order.sub_total = orderPrice;
    order.payable_amount = orderPrice;
    order.created_by = createObjectId(userData.id);
    order.created_by_type = CreatedByUserType.user;
    order.camp_id = createObjectId(userData.location_camp.location_camp_id);

    const promises = [];

    if (!activeInternetPackage) {
      const startDate = new Date();
      const expireDate = new Date(startDate.getTime());
      expireDate.setTime(
        expireDate.getTime() + minuteInMilleSeconds(order.duration)
      );
      order.package_start_date = startDate;
      order.purchase_date = startDate;
      order.package_expiry_date = expireDate;
      order.order_status = OrderStatus.active;
    } else {
      order.package_start_date = activeInternetPackage?.package_expiry_date;
      order.purchase_date = new Date();
      order.package_expiry_date = new Date(
        activeInternetPackage?.package_expiry_date!.getTime() +
          minuteInMilleSeconds(order.duration)
      );
      order.order_status = OrderStatus.pending;
    }

    const wallet_amount = wallet.wallet_amount - orderPrice;
    promises.push(
      await orderInternetPackageService.createOrderInternetPackage(order)
    );
    promises.push(
      await userWalletService.updateWalletAmount(wallet._id, wallet_amount)
    );

    const location_client = await getClientByIdWithoutStatus(
      userData.location_camp.location_camp_id
    );

    let service_info = null;
    if (packageData?.service_id) {
      service_info = await getServiceById(packageData?.service_id);
    }

    // Adding Wallet Transaction
    promises.push(
      await addNewTransaction({
        userid: userData.id,
        walletid: wallet._id.toString(),
        amount: orderPrice,
        currency: location_client?.currency_code || "",
        title: `${service_info?.transaction_title || "Membership Purchased"} (${
          packageData.internet_package_client.package_name
        })`,
        type: "debit",
        revenue:
          packageData.package_sales_price - packageData.package_cost_price || 0,
        sales_amount: packageData.package_sales_price || 0,
        cost_amount: packageData.package_cost_price || 0,
        serviceid: packageData?.service_id,
        ref_id: order._id.toString(),
        campId: userData.location_camp.location_camp_id,
        clientId: userData.location_camp.location_camp_client_id,
      })
    );

    await Promise.all(promises).then(() => console.log("success"));
    const data = formatResponse(
      200,
      false,
      `#${order.order_number} order has been created successfully`,
      null
    );
    res.status(200).json(data);
    return;
  } catch (e: any) {
    const data = formatResponse(500, true, e.message, null);
    console.log(data);
    res.status(500).json(data);
    return;
  }
};
