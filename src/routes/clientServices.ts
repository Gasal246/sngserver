import * as express from "express";
import { verifyClientToken } from "../middlewares/auth/client";
import { getAssignedServices } from "../controllers/serviceController/clientServices/getAllServices";
import { getCampAssignedServices } from "../controllers/serviceController/clientServices/getCampAssignedServices";
import { addCampAssignedService } from "../controllers/serviceController/clientServices/addCampService";
import {
  activateCampAssignedServiceValidator,
  addCampAssignedServiceValidator,
} from "../middlewares/validators/clientAssignServicesValidator";
import { activateCampAssignedService } from "../controllers/serviceController/clientServices/campServiceActivation";

const router = express.Router();

router.get("/assigned-services", verifyClientToken, getAssignedServices);
router.get(
  "/camp-assigned-services",
  verifyClientToken,
  getCampAssignedServices
);

router.post(
  "/camp-assigned-services/add",
  [verifyClientToken, addCampAssignedServiceValidator],
  addCampAssignedService
);
router.post(
  "/camp-assigned-services/activation",
  [verifyClientToken, activateCampAssignedServiceValidator],
  activateCampAssignedService
);
export default router;
