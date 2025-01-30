import { Request, Response } from "express";

import db from "../../models";
import { formatResponse } from "../../helpers";
import {
  getInternetPackageAssignedToCampById,
  updateInternetPackageAssignedCamps,
} from "../../services/internet_package_client";

export const updateInternetPackageAssignedToCamps = async (
  req: Request,
  res: Response
) => {
  try {
    const internet_package_assign_camp_id = req.params.id;
    if (!internet_package_assign_camp_id) {
      const data = formatResponse(
        401,
        true,
        "No Internet Package Assigned To Camp Id is provided.",
        null
      );
      res.status(401).json(data);
      return;
    }

    const obj = await getInternetPackageAssignedToCampById(
      internet_package_assign_camp_id
    );
    if (!obj) {
      const data = formatResponse(
        401,
        true,
        "The Provided Id Not Found!!",
        null
      );
      res.status(401).json(data);
      return;
    }

    await updateInternetPackageAssignedCamps(
      internet_package_assign_camp_id,
      req.body
    )
      .then((data) => {
        if (!data) {
          throw new Error(
            "Something went wrong on updating internet package assinged to camp"
          );
        }
        const res_data = formatResponse(
          200,
          false,
          req.body?.deleted_at
            ? "Internet Package Assigned to Camp Deleted Successfully"
            : "Internet Package Assigned to Camp Updated Successully",
          data
        );
        res.status(200).json(res_data);
        return;
      })
      .catch((e) => console.log(e));
  } catch (e: any) {
    const data = formatResponse(500, true, e.message, null);
    res.status(500).json(data);
    return;
  }
};
