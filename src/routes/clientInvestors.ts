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

export default router;
