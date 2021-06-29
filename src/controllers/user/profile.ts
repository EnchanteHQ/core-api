import { Request, Response } from "express";

import {
  InternalErrorResponse,
  NotFoundResponse,
  SuccessResponse,
} from "../../core/ApiResponse";
import User, { userModel } from "../../db/models/User";

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

  firstLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { imgUrl, mobileNumber, description, userLink, interests } =
        req.body;

      const { id } = req.user;

      const firstLogin = true;

      const user: User = await userModel.findOneAndUpdate(
        { _id: id },
        { imgUrl, mobileNumber, description, userLink, interests, firstLogin },
        { new: true }
      );

      if (!user) {
        new NotFoundResponse("User not found!", {}).send(res);
      }

      new SuccessResponse(
        "User details have been filled successfully!",
        user
      ).send(res);
    } catch (error) {
      console.log(`Error filling up user details:>> ${error}`);
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
      new InternalErrorResponse("Unable to fetch first login", {}).send(res);
    }
  };
}

export default ProfileController;
