import { Request, Response } from "express";
import admin from "../config/firebase";

import { InternalErrorResponse, SuccessResponse } from "../core/ApiResponse";
import generateJwtToken from "../middlewares/auth";

class AuthController {
  googleAuth = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token } = req.body;

      let firebaseUid: string;
      let userDetails: admin.auth.UserRecord;

      await admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
          const { uid } = decodedToken;
          firebaseUid = uid;
        })
        .catch((e) => {
          console.error("Error in verifing token", e);
        });

      await admin
        .auth()
        .getUser(firebaseUid)
        .then((userRecord) => {
          userDetails = userRecord;
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });

      const jwtToken: string = generateJwtToken({ id: userDetails.uid });
      console.log(jwtToken);

      // TODO: send user record to be stored in db

      new SuccessResponse("Successfully registered!", {
        token,
      }).send(res);
    } catch (error) {
      console.log(`Error in googleAuth:>> ${error}`);
      new InternalErrorResponse("Error fetching profile!").send(res);
    }
  };
}

export default AuthController;
