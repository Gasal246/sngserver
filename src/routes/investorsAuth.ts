import * as express from "express";
import {
  getInvestorProfile,
  investorLogin,
  updateInvestorPassword,
} from "../controllers";
import {
  loginValidator,
  updatePasswordValidator,
} from "../middlewares/validators";
import { verifyInvestorToken } from "../middlewares/auth/investors";
import multer from "multer";
import {
  getInvestorCampRevenue,
  getInvestorCampWiseRevenue,
} from "../controllers/investors/get-campwise-investor-revenue";
import {
  getInvestorServiceRevenue,
  getInvestorServiceWiseRevenue,
} from "../controllers/investors/get-servicewise-revenue";
import {
  getInvestorAssignedCamps,
  getInvestorMembershipAssignedCamps,
} from "../controllers/investors/get-assigned-camps";
import { getInvestorAssignedServices } from "../controllers/investors/get-investor-services";
import { getClientInvestorRevenueSchedule } from "../controllers/investors/investor-revenue-shedule";
import { getInvestorMembershipUsers } from "../controllers/investors/investor-users";

const router = express.Router();

router.post("/login", multer().array(""), loginValidator, investorLogin);
router.post(
  "/update-password",
  multer().array(""),
  [verifyInvestorToken, updatePasswordValidator],
  updateInvestorPassword
);
router.get("/profile", verifyInvestorToken, getInvestorProfile);

router.get(
  "/get-campwise-revenue",
  verifyInvestorToken,
  getInvestorCampWiseRevenue
);

router.get(
  "/get-servicewise-revenue",
  verifyInvestorToken,
  getInvestorServiceWiseRevenue
);

router.get(
  "/get-camp-revenue/:campId",
  verifyInvestorToken,
  getInvestorCampRevenue
);

router.get(
  "/get-service-revenue/:serviceId",
  verifyInvestorToken,
  getInvestorServiceRevenue
);

router.get(
  "/get-investor-camps/:investorId",
  verifyInvestorToken,
  getInvestorAssignedCamps
);

router.get(
  "/get-investor-services/:investorId/:campId",
  verifyInvestorToken,
  getInvestorAssignedServices
);

router.get(
  "/get-investor-schedules/:investorId/:campId/:serviceId",
  verifyInvestorToken,
  getClientInvestorRevenueSchedule
);

router.get(
  "/get-membership-assigned-camps",
  verifyInvestorToken,
  getInvestorMembershipAssignedCamps
);

router.get(
  "/get-investor-users/membership/:campId",
  verifyInvestorToken,
  getInvestorMembershipUsers
);

export default router;
