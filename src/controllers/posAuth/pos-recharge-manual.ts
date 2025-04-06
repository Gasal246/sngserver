import { Request, Response } from "express";
import {
  CampAssignPosService,
  campService,
  userCampService,
  userRechargeService,
  userRegisterService,
  userWalletService,
} from "../../services";
import {
  Message,
  createObjectId,
  formatResponse,
  generateRandomPackageCode,
} from "../../helpers";
import { isValidObjectId } from "mongoose";
import db from "../../models";
import {
  PosCategoryEnum,
  RechargeTypeEnum,
  CreatedByUserType,
} from "../../types/enums";
import {
  addNewTransaction,
  getTransactionsByWalletId,
} from "../../services/user_transactions";
import { getClientCurrencyCode } from "../../services/client";
import { getWalletById } from "../../services/user_wallet";

export const userWalletRecharge = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  try {
    if (!isValidObjectId(req.body.profile_camp_id)) {
      const data = formatResponse(400, true, Message.CAMP_NOT_FOUND, null);
      res.status(400).json(data);
      return;
    }

    const camp = await campService.getCampById(req.body.profile_camp_id);
    if (!camp) {
      const data = formatResponse(400, true, Message.CAMP_NOT_FOUND, null);
      res.status(400).json(data);
      return;
    }

    const campAssignPos = await CampAssignPosService.isCampAssignToPos(
      req.decodedToken.data.id,
      req.body.profile_camp_id
    );
    if (!campAssignPos) {
      const data = formatResponse(400, true, "Camp not assigned to pos.", null);
      res.status(400).json(data);
      return;
    }

    if (campAssignPos.camp_category == PosCategoryEnum.OFFLINE) {
      const data = formatResponse(400, true, Message.OUT_OF_SERVICE_AREA, null);
      res.status(400).json(data);
      return;
    }

    if (!isValidObjectId(req.body.user_id)) {
      const data = formatResponse(400, true, Message.USER_NOT_FOUND, null);
      res.status(400).json(data);
      return;
    }

    const user = await userRegisterService.findUser(
      createObjectId(req.body.user_id)
    );
    if (!user) {
      const data = formatResponse(400, true, Message.USER_NOT_FOUND, null);
      res.status(400).json(data);
      return;
    }

    let assignCampDetails = await userCampService.getAssignCampDetailsOfUser(
      req.body.user_id
    );
    if (!assignCampDetails) {
      const userCamp = new db.userCampModel();
      userCamp.user_id = user?._id;
      userCamp.camp_id = req.body.profile_camp_id;
      userCamp.client_id = camp.client_id;
      userCamp.status = 1;
      assignCampDetails = await userCampService.assignUserToCamp(userCamp);
    }

    let walletData = await userWalletService.walletAvailableForUserAndClient(
      camp.client_id?.toString(),
      req.body.user_id
    );

    const promises = [];
    if (walletData) {
      const wallet_balance =
        walletData.wallet_amount + parseFloat(req.body.recharge_amount);
      await userWalletService.updateWalletAmount(
        walletData._id,
        wallet_balance
      );
    } else {
      const wallet = new db.userWalletModel();
      wallet.user_id = createObjectId(req.body.user_id);
      wallet.client_id = camp.client_id;
      wallet.wallet_amount = parseFloat(req.body.recharge_amount);
      wallet.status = 1;
      walletData = await userWalletService.createWallet(wallet);
    }

    const userRecharge = new db.userRechargeModel();
    userRecharge.user_id = user._id;
    userRecharge.created_by = createObjectId(req.decodedToken.data.id);
    userRecharge.created_by_type = CreatedByUserType.pos;
    userRecharge.role_id = createObjectId(req.decodedToken.data.role_id);
    userRecharge.type = RechargeTypeEnum.POS_TOP_UP;
    userRecharge.recharge_amount = req.body.recharge_amount;
    userRecharge.camp_id = createObjectId(req.body.profile_camp_id);
    userRecharge.status = 1;
    userRecharge.transaction_id = generateRandomPackageCode();
    // userRecharge.service_amount = req.body.service_amount;
    // userRecharge.payable_amount = parseFloat(req.body.recharge_amount);

    promises.push(userRechargeService.createUserRecharge(userRecharge));

    const currency_code = await getClientCurrencyCode(
      req.decodedToken.data.client_id
    );

    promises.push(
      addNewTransaction({
        amount: req.body.recharge_amount,
        currency: currency_code,
        title: RechargeTypeEnum.POS_TOP_UP,
        type: "credit",
        userid: user._id.toString(),
        walletid: walletData?._id?.toString(),
        created_by_type: req?.body?.created_by_type,
        pos_user_id: req?.body?.pos_user_id,
        ref_id: req?.body?.transaction_reference_id,
      })
    );

    await Promise.all(promises);

    const updated_wallet = await getWalletById(walletData?._id?.toString());
    const transactions = await getTransactionsByWalletId(
      walletData?._id?.toString(),
      1
    );

    const data = formatResponse(200, false, "User recharge done successfully", {
      updated_wallet,
      transactions,
    });
    res.status(200).json(data);
    return;
  } catch (e: any) {
    const data = formatResponse(500, true, e.message, null);
    res.status(500).json(data);
    return;
  }
};
