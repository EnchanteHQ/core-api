import { Request, Response } from "express";

import {
  InternalErrorResponse,
  NotFoundResponse,
  SuccessResponse,
} from "../../core/ApiResponse";
import User, { userModel } from "../../db/models/User";
import avatarImages from "../../constants";

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
      new SuccessResponse("Avatar images to be served!", avatarImages).send(
        res
      );
    } catch (error) {
      console.error(`Error fetching avatar images:>> ${error}`);
      new InternalErrorResponse("Error fetching avatar images!", {}).send(res);
    }
  };

  firstLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { imgUrl, phoneNumber, description, userLink, interests } =
        req.body;

      const { id } = req.user;

      const firstLogin = true;

      const user: User = await userModel.findOneAndUpdate(
        { _id: id },
        {
          userImg: imgUrl,
          phoneNumber,
          description,
          userLink,
          interestedIn: interests,
          firstLogin,
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

  filledFirstLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { firstLogin } = req.user;

      new SuccessResponse("First Login Check", {
        firstLoginFilled: firstLogin,
      }).send(res);
    } catch (error) {
      console.error(`Unable to fetch first login:>> ${error}`);
      new InternalErrorResponse("Unable to fetch first login", {}).send(res);
    }
  };
}

export default ProfileController;
