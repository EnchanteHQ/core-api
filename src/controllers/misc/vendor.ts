import { Request, Response } from "express";

import { InternalErrorResponse, SuccessResponse } from "../../core/ApiResponse";

import Vendor, { vendorModel } from "../../db/models/Vendor";

class MiscController {
  addVendorARID = async (req: Request, res: Response): Promise<void> => {
    try {
      const { vendorID, ARID } = req.body;

      const vendor: Vendor = await vendorModel.findOneAndUpdate(
        { _id: vendorID },
        {
          ARID,
        },
        { new: true }
      );

      new SuccessResponse("Details added!", { vendor }).send(res);
    } catch (err) {
      console.error(`Error in adding vendor AR ID:>> ${err}`);
      new InternalErrorResponse(err.message, {}).send(res);
    }
  };

  getVendorARID = async (req: Request, res: Response): Promise<void> => {
    try {
      const { vendorID } = req.query;

      const vendor: Vendor = await vendorModel.findOne(
        { _id: vendorID },
        "ARID"
      );

      console.log(vendorID);

      new SuccessResponse("Details fetched!", { vendor }).send(res);
    } catch (err) {
      console.error(`Error in adding vendor AR ID:>> ${err}`);
      new InternalErrorResponse(err.message, {}).send(res);
    }
  };
}

export default MiscController;
