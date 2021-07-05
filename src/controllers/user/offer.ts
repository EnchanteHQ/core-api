import { Request, Response } from "express";

import { InternalErrorResponse, SuccessResponse } from "../../core/ApiResponse";
import Offer, { offerModel } from "../../db/models/Offer";

class OfferController {
  getOfferById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const offer: Offer = await offerModel.findById(id, "-scope");

      new SuccessResponse("The requested offer has been sent!", {
        offer,
      }).send(res);
    } catch (error) {
      console.error(`Error sending offer details:>> ${error}`);
      new InternalErrorResponse("Error sending offer details!", {}).send(res);
    }
  };
}

export default OfferController;
