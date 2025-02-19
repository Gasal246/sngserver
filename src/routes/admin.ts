import * as express from "express";
import {
  addService,
  adminLogin,
  getAdminDetails,
  getAllCampsClientWise,
  getCampsClientWise,
  getProfile,
  updatePassword,
} from "../controllers";
import {
  checkMongooseId,
  loginValidator,
  updatePasswordValidator,
} from "../middlewares/validators";
import { verifyToken } from "../middlewares/auth/admin";
import multer from "multer";
import {
  clientAttachedServiceStatusChangeValidator,
  serviceAddValidator,
  serviceAttachValidator,
  serviceEditValidator,
  serviceSoftDeleteValidator,
} from "../middlewares/validators/service-add-validator";
import { getAllServices } from "../controllers/serviceController/get-all";
import { updateService } from "../controllers/serviceController/update-service";
import { changeStatus } from "../controllers/serviceController/delete-service";
import { getClientServices } from "../controllers/serviceController/get-client-services";
import {
  attachServiceToClient,
  changeStatusOfAttachedService,
} from "../controllers/serviceController/attach-service";

const router = express.Router();

/**
 * Use middleware like auth, that should verify the token and if token is valid decode it and save all values into req.decodedToken
 * Then you can access token payload like, const decodedToke = req.decodedToken;
 * decodedToke.role, decodedToke.userId, etc...
 */

router.post("/login", multer().array(""), loginValidator, adminLogin);
router.post(
  "/update-password",
  multer().array(""),
  [verifyToken, updatePasswordValidator],
  updatePassword
);
router.get("/profile", verifyToken, getProfile);
router.get("/details", verifyToken, getAdminDetails);
router.get("/camps/:id", [verifyToken, checkMongooseId], getCampsClientWise);
router.get("/clientWiseAllCamps", verifyToken, getAllCampsClientWise);

// SERVICES
router.post(
  "/services/add-one",
  [verifyToken, serviceAddValidator],
  addService
);
router.get("/services/getall", verifyToken, getAllServices);
router.post(
  "/services/update",
  [verifyToken, serviceEditValidator],
  updateService
);
router.post(
  "/services/change-status",
  [verifyToken, serviceSoftDeleteValidator],
  changeStatus
);

router.get("/services/client", verifyToken, getClientServices);
router.post(
  "/services/attach-client",
  [verifyToken, serviceAttachValidator],
  attachServiceToClient
);
router.post(
  "/services/change-client-status",
  [verifyToken, clientAttachedServiceStatusChangeValidator],
  changeStatusOfAttachedService
);

export default router;
