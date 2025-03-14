import { Request, Response } from "express";
import { formatResponse } from "../../helpers";
import { coordinatorService, roleService } from "../../services";
import { Roles } from "../../types/enums";

export const addCoordinator = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  try {
    const role = await roleService.getRoleBySlug(Roles.ROLE_COORDINATOR);

    if (!role) {
      const data = formatResponse(
        401,
        true,
        "Coordinator role not available.",
        null
      );
      res.status(401).json(data);
      return;
    }

    let client_id = null;
    if (req.decodedToken.data.role_slug == Roles.ROLE_CLIENT_ADMIN) {
      const totalCount = await coordinatorService.getCoordinatorCount(
        req.decodedToken.data.id
      );

      const limit = req.decodedToken.data.no_cordinator;

      if (totalCount >= limit) {
        const data = formatResponse(
          400,
          true,
          "Your can't exceed your coordinator limit",
          null
        );
        res.status(200).json(data);
        return;
      }

      client_id = req.decodedToken.data.id;
    }

    req.body.client_id = client_id;

    await coordinatorService.createCoordinator(role._id, req.body);

    const data = formatResponse(
      200,
      false,
      "Coordinator created successfully.",
      null
    );
    res.status(200).json(data);
    return;
  } catch (e: any) {
    const data = formatResponse(500, true, e.message, null);
    res.status(500).json(data);
    return;
  }
};
