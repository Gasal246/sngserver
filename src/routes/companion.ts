import * as express from "express";
import { verifyUserToken } from "../middlewares/auth/user";

const router = express.Router();

// This route will return the purchased order of the user, having the isCompanion ( boolean ) as TRUE.
// Complecated tasks are handled by taskmanager [ WIDELINE IT SOLUTION ] __gasal246
router.get("/membership-history", verifyUserToken);

/* 
> COMPANINON DEVICES PURCHASES ARE MANAGED BY MAIN DEVICES..
    as the purchases are managed by main devices the normal purchase api can be used for purchasing package for the companion device too..
    but if the companion device is intent to purchase the packages then the purchased packages
    and the order details of the purchased packages will be having the field of isCompainon ( boolean ).

    _gasal246 [ ABDUL GAFOOR CHEERANGAL ]
*/
