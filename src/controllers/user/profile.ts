/* eslint-disable @typescript-eslint/no-explicit-any */
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
import RapydApi from "../../util/axios";

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

      const wallet = await RapydApi.post("/user", {
        first_name: user.name.split(" ")[0],
        last_name: user.name.split(" ")[1],
        email: user.email,
        ewallet_reference_id: "user.id",
        metadata: {
          merchant_defined: false,
        },
        phone_number: user.phoneNumber,
        type: "person",
        contact: {
          phone_number: user.phoneNumber,
          email: user.email,
          first_name: user.name.split(" ")[0],
          last_name: user.name.split(" ")[1],
          mothers_name: "",
          contact_type: "personal",
          address: {
            name: "John Doe",
            line_1: "123 Main Street",
            line_2: "",
            line_3: "",
            city: "Anytown",
            state: "NY",
            country: "US",
            zip: "12345",
            phone_number: "+14155551111",
            metadata: {},
            canton: "",
            district: "",
          },
          identification_type: "",
          identification_number: "",
          date_of_birth: "",
          country: "",
          nationality: "",
          metadata: {
            merchant_defined: false,
          },
        },
      }).catch((error) => {
        if (error.response) {
          console.log(error);
          console.log(error.response.data);
          throw new Error(error.response.data.status.message);
        }
      });

      if (wallet) {
        await userModel.findOneAndUpdate(
          { _id: id },
          { walletId: wallet.data.data.id },
          { new: true }
        );
      }

      new SuccessResponse(
        "User details have been filled successfully!",
        user
      ).send(res);
    } catch (error) {
      console.error(`Error filling up user details:>> ${error}`);

      new InternalErrorResponse("Error filling up user details!", {
        error: `${error}`,
      }).send(res);
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
      const userId = req.user.id;
      // const currEvents = await eventModel.find();
      const now = moment().format(constants.momentDateFormat);
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
      console.error(`Error fetching user's events:>> ${error}`);
      new InternalErrorResponse("Error fetching user's events!", {}).send(res);
    }
  };
}

export default ProfileController;
