const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";

import { Message, formatResponse } from "../../helpers";
import { authConfig } from "../../config/auth.config";
import { plantManagerService } from "../../services";

export const verifyPlantManagerToken = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (
    !req.headers.authorization ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const data = formatResponse(401, true, Message.ACCESS_DENIED, null);
    res.status(401).json(data);
    return;
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, authConfig.token);
    const coordinatorId = decoded.data.id;
    const user = await plantManagerService.getPlantManagerById(coordinatorId);
    if (!user) {
      const data = formatResponse(401, true, Message.ACCESS_DENIED, null);
      res.status(401).json(data);
      return;
    }

    req.decodedToken = decoded;
  } catch (err) {
    const data = formatResponse(401, true, Message.ACCESS_DENIED, null);
    res.status(401).json(data);
    return;
  }
  next();
};

export default { verifyPlantManagerToken };
