import * as express from "express";
import { serviceAddValidator } from "../middlewares/validators/service-add-validator";
import { addService } from "../controllers";

const router = express.Router();

router.post("/add-service", serviceAddValidator, addService);

export default router;
