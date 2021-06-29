import { Request, Response } from "express";
import moment from "moment";
import UserEventMapping, {
  userEventMappingModel,
} from "../../db/models/UserEventMapping";

import {
  InternalErrorResponse,
  NotFoundResponse,
  SuccessResponse,
} from "../../core/ApiResponse";
import { eventModel } from "../../db/models/Event";

import User, { userModel } from "../../db/models/User";
import constants from "../../constants";

class ProfileController {
  getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.user;

      const user: User = await userModel.findById(id).select("-__v");

      new SuccessResponse("Profile to be served!", { user }).send(res);
    } catch (error) {
      console.error(`Error fetching profile!:>> ${error}`);
      new InternalErrorResponse("Error fetching profile!", {}).send(res);
    }
  };

  avatarImages = async (req: Request, res: Response): Promise<void> => {
    try {
      new SuccessResponse(
        "Avatar images to be served!",
        constants.avatarImages
      ).send(res);
    } catch (error) {
      console.error(`Error fetching avatar images:>> ${error}`);
      new InternalErrorResponse("Error fetching avatar images!", {}).send(res);
    }
  };

  registration = async (req: Request, res: Response): Promise<void> => {
    try {
      const { imgUrl, phoneNumber, description, socialLink, interests } =
        req.body;

      const { id } = req.user;

      const registrationCompleted = true;

      const user: User = await userModel.findOneAndUpdate(
        { _id: id },
        {
          userImg: imgUrl,
          phoneNumber,
          description,
          socialLink,
          interestedIn: interests,
          registrationCompleted,
        },
        { new: true }
      );

      if (!user) {
        new NotFoundResponse("User not found!", {}).send(res);
      }

      // TODO: init rapyd wallet

      new SuccessResponse(
        "User details have been filled successfully!",
        user
      ).send(res);
    } catch (error) {
      console.error(`Error filling up user details:>> ${error}`);
      new InternalErrorResponse("Error filling up user details!", {}).send(res);
    }
  };

  registrationCompleted = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { registrationCompleted } = req.user;

      new SuccessResponse("Registration completed Check", {
        registrationCompleted,
      }).send(res);
    } catch (error) {
      console.error(`Unable to fetch first login:>> ${error}`);
      new InternalErrorResponse("Unable to fetch first login", {}).send(res);
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
