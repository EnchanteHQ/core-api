import { Request, Response } from "express";

import { InternalErrorResponse, SuccessResponse } from "../core/ApiResponse";

class UserController {
  profile = async (req: Request, res: Response): Promise<void> => {
    try {
      new SuccessResponse("Profile to be served!", { profile: "TBD" }).send(
        res
      );
    } catch (error) {
      console.log(`tbd:>> ${error}`);
      new InternalErrorResponse("Error fetching profile!").send(res);
    }
  };
}

export default UserController;
