import { Request, Response } from "express";
import { Types } from "mongoose";

import { InternalErrorResponse, SuccessResponse } from "../../core/ApiResponse";
import Event, { eventModel } from "../../db/models/Event";
import Offer, { offerModel } from "../../db/models/Offer";

class EventController {
  getEventById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const events: Event = await eventModel.findById(id);

      const offersWrtEventOrUser: Array<Offer> = await offerModel.find({
        $or: [
          { "scope.eventId": Types.ObjectId(id) },
          { "scope.userId": Types.ObjectId(userId) },
        ],
      });
      new SuccessResponse("The requested event has been sent!", {
        events,
        offersWrtEventOrUser,
      }).send(res);
    } catch (error) {
      console.error(`Error sending event details:>> ${error}`);
      new InternalErrorResponse("Error sending event details!", {}).send(res);
    }
  };
}

export default EventController;
