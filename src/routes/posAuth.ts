import * as express from "express";
import {
  getInternetPackageOrderCampWise,
  getInternetPackageOrderUserWise,
  getPosCamps,
  getPosCampsClientWise,
  getPosProfile,
  getUsers,
  placeInternetOrder,
  posLogin,
  updatePosPassword,
  userWalletRecharge,
} from "../controllers";
import {
  getCampWiseInternetOrderValidator,
  getCampWiseInternetPackageValidator,
  posCampInternetPackageListValidator,
  posInternetOrderValidator,
  posLoginValidator,
  posRechargeManualValidator,
  updatePasswordValidator,
  userSearchValidator,
} from "../middlewares/validators";
import { verifyPosToken } from "../middlewares/auth/pos";
import multer from "multer";
import { getInternetPackageList } from "../controllers/posAuth/get-internet-package-list";
import { getPosListByCampId } from "../controllers/pos/camps-pos";
import {
  addMobileChangeRecord,
  getUserMobileChangeHistory,
} from "../controllers/pos/mobile-change";

const router = express.Router();

router.post("/login", multer().array(""), posLoginValidator, posLogin);

router.get("/profile", verifyPosToken, getPosProfile);
router.post(
  "/update-password",
  multer().array(""),
  [verifyPosToken, updatePasswordValidator],
  updatePosPassword
);
router.get("/getCamps", [verifyPosToken], getPosCamps);
router.post(
  "/recharge/recharge-manual",
  multer().array(""),
  [verifyPosToken, posRechargeManualValidator],
  userWalletRecharge
);
router.get("/user/search", [verifyPosToken, userSearchValidator], getUsers);

router.get(
  "/camps/packages/internet",
  [verifyPosToken, getCampWiseInternetPackageValidator],
  getInternetPackageList
);

router.post(
  "/internet-package/place-order",
  multer().array(""),
  [verifyPosToken, posInternetOrderValidator],
  placeInternetOrder
);
router.get(
  "/internet-package/order",
  [verifyPosToken, getCampWiseInternetOrderValidator],
  getInternetPackageOrderCampWise
);
router.get(
  "/internet-package/order-by-user",
  [verifyPosToken, posCampInternetPackageListValidator],
  getInternetPackageOrderUserWise
);
router.get("/getCamps-client-wise", [verifyPosToken], getPosCampsClientWise);

router.get(
  "/get-pos-assigned-to-camp/:camp_id",
  verifyPosToken,
  getPosListByCampId
);

router.get(
  "/get-mobile-change-history/:userId",
  verifyPosToken,
  getUserMobileChangeHistory
);

router.post("/allow-mobile-change", verifyPosToken, addMobileChangeRecord);

export default router;
