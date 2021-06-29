import { Request, Response } from "express";
import moment from "moment";
import UserEventMapping, {
  userEventMappingModel,
} from "../../db/models/UserEventMapping";

import { InternalErrorResponse, SuccessResponse } from "../../core/ApiResponse";
import { eventModel } from "../../db/models/Event";

class ProfileController {
  getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      new SuccessResponse("Profile to be served!", { profile: "TBD" }).send(
        res
      );
    } catch (error) {
      console.log(`tbd:>> ${error}`);
      new InternalErrorResponse("Error fetching profile!", {}).send(res);
    }
  };

  getMyEvents = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.body;
      // const currEvents = await eventModel.find();
      const now = moment().format("DD MMM YYYY HH:mm");
      const userEvents: Array<UserEventMapping> = await userEventMappingModel
        .find({ userId }, "eventId budget passType")
        .populate({
          path: "eventId",
          model: eventModel,
        });
      const pastEvents = [];
      const futureEvents = [];

      userEvents.forEach((event) => {
        const eventDetails: any = event.eventId;
        let passForCurrentEvent: string;
        eventDetails.passes.forEach((pass) => {
          if (pass.id === event.passType.toString()) {
            passForCurrentEvent = pass.passName;
          }
        });
        if (eventDetails.duration.startTimeAndDate <= now) {
          pastEvents.push(event, passForCurrentEvent);
        } else {
          futureEvents.push(event, passForCurrentEvent);
        }
      });
      new SuccessResponse("User's events have been sent!", {
        pastEvents,
        futureEvents,
      }).send(res);
    } catch (error) {
      console.log(`tbd:>> ${error}`);
      new InternalErrorResponse("Error fetching user's events!", {}).send(res);
    }
  };
}

export default ProfileController;
