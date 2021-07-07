import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { InternalErrorResponse, SuccessResponse } from "../../core/ApiResponse";
import Admin, { adminModel } from "../../db/models/Admin";
import generateJwtToken from "../../middlewares/auth";

class AuthController {
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, orgName, password, eventId, walletId } = req.body;
      const hash: string = await bcrypt.hash(password, 10);
      const newAdmin: Admin = await adminModel.create({
        email,
        orgName,
        password: hash,
        eventId,
        walletId,
      });
      const jwtToken: string = generateJwtToken({
        id: newAdmin.id,
        admin: true,
      });

      new SuccessResponse("Admin Created!", { newAdmin, jwtToken }).send(res);
    } catch (err) {
      console.error(`Error in admin auth:>> ${err}`);
      new InternalErrorResponse(err.message, {}).send(res);
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const adminFound: Admin = await adminModel.findOne({ email });
        if (adminFound) {
          const matchPassword: boolean = await bcrypt.compare(
            password,
            adminFound.password
          );
          if (matchPassword) {
            const jwtToken: string = generateJwtToken({
              id: adminFound.id,
            });
            new SuccessResponse("Successful!", {
              jwtToken,
              firstTimeUser: false,
            }).send(res);
          } else {
            throw new Error("No such admin found");
          }
        } else {
          throw new Error("No such admin found");
        }
      }
    } catch (err) {
      console.error(`Error in admin auth:>> ${err}`);
      new InternalErrorResponse(err.message, {}).send(res);
    }
  };
}

export default AuthController;
