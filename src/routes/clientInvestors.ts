import * as express from "express";
import {
  addInvestor,
  getAllInvestors,
  getOneInvestor,
  investorStatusUpdate,
  updateInvestor,
} from "../controllers";
import {
  addInvestorValidator,
  assignInvestorCampValidator,
  checkMongooseId,
  isInvestorIdIsExists,
  statusUpdateValidator,
  statusValidator,
} from "../middlewares/validators";
import { verifyClientToken } from "../middlewares/auth/client";
import multer from "multer";
import { getInvestorAssignedCamps } from "../controllers/investors/get-assigned-camps";
import { assignCampToInvestor } from "../controllers/investors/assign-camp";
import {
  RecoverInvestorAssignCamp,
  RemoveInvestorAssignedCamp,
} from "../controllers/investors/remove-assigned-camp";
import {
  getInvestorAssignedServicesParamsValidator,
  investorAssignCampServiceValidator,
  investorServiceStatusChangeValidator,
} from "../middlewares/validators/investor-assign-camp-services";
import { addCampService } from "../controllers/investors/add-camp-service";
import { getInvestorAssignedServices } from "../controllers/investors/get-investor-services";
import { investorServiceStatusChange } from "../controllers/investors/investor-service-status-change";
import {
  addInvestorRevenueSheduleValidator,
  validateEditInvestorRevenueSchedule,
  validateGetInvestorRevenueSchedule,
} from "../middlewares/validators/investor-revenue-shedules";
import { addInvestorRevenueSchedule } from "../controllers/investors/add-investor-revenue-schedule";
import { getClientInvestorRevenueSchedule } from "../controllers/investors/investor-revenue-shedule";
import { editInvestorRevenueSchedule } from "../controllers/investors/edit-investor-revenue-schedule";

const router = express.Router();
router.post(
  "/investors",
  multer().array(""),
  [verifyClientToken, addInvestorValidator],
  addInvestor
);
router.put(
  "/investors/:id",
  multer().array(""),
  [verifyClientToken, isInvestorIdIsExists, addInvestorValidator],
  updateInvestor
);
router.post(
  "/investors/status-update/:id",
  multer().array(""),
  [verifyClientToken, checkMongooseId, statusUpdateValidator],
  investorStatusUpdate
);
router.get("/investors", [verifyClientToken, statusValidator], getAllInvestors);
router.get(
  "/investors/:id",
  [verifyClientToken, checkMongooseId],
  getOneInvestor
);

router.post(
  "/investor/add-camp",
  [verifyClientToken, assignInvestorCampValidator],
  assignCampToInvestor
);

router.get(
  "/investor/get-assigned-camps/:investorId",
  verifyClientToken,
  getInvestorAssignedCamps
);

router.post(
  "/remove-investor-camp",
  [verifyClientToken, assignInvestorCampValidator],
  RemoveInvestorAssignedCamp
);

router.post(
  "/recover-investor-camp",
  [verifyClientToken, assignInvestorCampValidator],
  RecoverInvestorAssignCamp
);

// investor assign camp services
router.post(
  "/investor/add-camp-service",
  [verifyClientToken, investorAssignCampServiceValidator],
  addCampService
);

router.get(
  "/investor/:investorId/assigned-services/:campId",
  [verifyClientToken, getInvestorAssignedServicesParamsValidator],
  getInvestorAssignedServices
);

router.post(
  "/investors/investor-service/status-change",
  [verifyClientToken, investorServiceStatusChangeValidator],
  investorServiceStatusChange
);

// investor revenue schedule
router.post(
  "/investor/add-schedule",
  [verifyClientToken, addInvestorRevenueSheduleValidator],
  addInvestorRevenueSchedule
);

router.get(
  "/investor/revenue-schedule/:investorId/:campId/:serviceId",
  [verifyClientToken, validateGetInvestorRevenueSchedule],
  getClientInvestorRevenueSchedule
);

router.post(
  "/investor/edit-revenue-schedule",
  [verifyClientToken, validateEditInvestorRevenueSchedule],
  editInvestorRevenueSchedule
);

export default router;
