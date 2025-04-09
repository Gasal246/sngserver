import * as express from "express";
import {
  accountantLogin,
  getAccountantDetails,
  getAccountantProfile,
  getAssignCampByAccountant,
  getAssignPos,
  getInternetPackageOrderAccountantWise,
  updateAccountantPassword,
} from "../controllers";
import {
  loginValidator,
  orderStatusValidator,
  updatePasswordValidator,
} from "../middlewares/validators";
import { verifyAccountantToken } from "../middlewares/auth/accountant";
import multer from "multer";
import { getAccountantAvailableServices } from "../controllers/accountant/get-available-services";
import {
  getCampSalesData,
  getSalesData,
  getServiceSalesData,
} from "../controllers/accountant/get-sales-data";
import {
  getCampSalesDataValidator,
  getCampWiseSalesDataValidator,
  getServiceSalesDataValidator,
} from "../middlewares/validators/accountant-sales-validator";
import {
  walletRechargeCampWiseValidator,
  walletRechargePosWiseValidator,
} from "../middlewares/validators/accountant-wallet-validator";
import { getCampWiseWalletRecharge } from "../controllers/accountant/wallet-campwise";
import { accountantAssignPos } from "../controllers/accountant/get-assigned-pos";
import { getPosWiseWalletRecharge } from "../controllers/accountant/wallet-poswise";

const router = express.Router();

router.post("/login", multer().array(""), loginValidator, accountantLogin);
router.post(
  "/update-password",
  multer().array(""),
  [verifyAccountantToken, updatePasswordValidator],
  updateAccountantPassword
);
router.get("/profile", verifyAccountantToken, getAccountantProfile);
router.get("/details", verifyAccountantToken, getAccountantDetails);
router.get(
  "/internet-package/order",
  [verifyAccountantToken, orderStatusValidator],
  getInternetPackageOrderAccountantWise
);

// ::::::::::::::: Accountant Sales ::::::::::::::::
router.get(
  "/get-assigned-camps",
  verifyAccountantToken,
  getAssignCampByAccountant
);
router.get(
  "/get-assigned-services",
  verifyAccountantToken,
  getAccountantAvailableServices
);

// ::::::::::::::: Accountant Wallet ::::::::::::::::
router.get("/get-assigned-pos", verifyAccountantToken, accountantAssignPos);

router.get(
  "/wallet/campwise",
  [verifyAccountantToken, walletRechargeCampWiseValidator],
  getCampWiseWalletRecharge
);

router.get(
  "/wallet/poswise",
  [verifyAccountantToken, walletRechargePosWiseValidator],
  getPosWiseWalletRecharge
);

router.get(
  "/get-all-sales",
  [verifyAccountantToken, getCampWiseSalesDataValidator],
  getSalesData
);
router.get(
  "/get-camp-sales",
  [verifyAccountantToken, getCampSalesDataValidator],
  getCampSalesData
);
router.get(
  "/get-service-sales",
  [verifyAccountantToken, getServiceSalesDataValidator],
  getServiceSalesData
);

export default router;
