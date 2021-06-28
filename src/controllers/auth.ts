import { Request, Response } from "express";
import admin from "../config/firebase";

import { InternalErrorResponse, SuccessResponse } from "../core/ApiResponse";
import generateJwtToken from "../middlewares/auth";

class AuthController {
  googleAuth = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token } = req.body;

      // let firebaseUid: string;
      let userDetails: admin.auth.UserRecord;

      await admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
          const { uid } = decodedToken;
          return uid;
        })
        .then(async (uid) => {
          await admin
            .auth()
            .getUser(uid)
            .then((userRecord) => {
              userDetails = userRecord;
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
              throw new Error("Error Fetching user data");
            });
        })
        .catch((e) => {
          console.error("Error verifing token", e);
          throw new Error("Error verifying token");
        });

      let jwtToken: string;

      if (userDetails !== undefined) {
        jwtToken = generateJwtToken({ id: userDetails.uid });
      }

      // TODO: send user record to be stored in db

      new SuccessResponse("Successfully registered!", {
        jwtToken,
      }).send(res);
    } catch (e) {
      console.error(`Error in googleAuth:>> ${e}`);
      new InternalErrorResponse(e.message, {}).send(res);
    }
  };
}

export default AuthController;
