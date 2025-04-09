import * as express from "express";
import { verifyUserToken } from "../middlewares/auth/user";

const router = express.Router();

router.get("/membership-history", verifyUserToken);

export default router;
