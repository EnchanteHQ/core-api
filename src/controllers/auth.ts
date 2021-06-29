import { Request, Response } from "express";
import admin from "../config/firebase";

import { InternalErrorResponse, SuccessResponse } from "../core/ApiResponse";
import User, { userModel } from "../db/models/User";
import generateJwtToken from "../middlewares/auth";

class AuthController {
  googleAuth = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token } = req.body;

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

      let user: User;
      let record: User;

      if (userDetails !== undefined) {
        record = await userModel.findOne({
          email: userDetails.email,
        });
        if (!record) {
          user = await userModel.create({
            email: userDetails.email,
            name: userDetails.displayName,
            userImg: userDetails.photoURL,
          });
        }
      }

      if (user) {
        // console.log(user.id);

        jwtToken = generateJwtToken({ id: user.id });
        new SuccessResponse("Successfully registered!", {
          jwtToken,
          firstTimeUser: true,
        }).send(res);
      }

      if (record) {
        // console.log(record.id);

        jwtToken = generateJwtToken({ id: record.id });
        new SuccessResponse("Successful!", {
          jwtToken,
          firstTimeUser: false,
        }).send(res);
      }
    } catch (e) {
      console.error(`Error in google auth:>> ${e}`);
      new InternalErrorResponse(e.message, {}).send(res);
    }
  };
}

export default AuthController;
