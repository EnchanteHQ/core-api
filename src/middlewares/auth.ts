/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-var-requires */
import jwt from "jsonwebtoken";
import passport from "passport";
import { ExtractJwt } from "passport-jwt";

import User, { userModel } from "../db/models/User";

const JwtStrategy = require("passport-jwt").Strategy;

const opts: any = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  "userStrategy",
  new JwtStrategy(opts, async (jwtPayload: any, done: any) => {
    try {
      console.log(jwtPayload);
      const user: User = await userModel.findById(jwtPayload.id);

      // done(null, true);
      done(null, user);
    } catch (error) {
      console.error(`JWT middleware error:>> ${error}`);
      done(null, false);
    }
  })
);

const generateJwtToken = (payload: object): string => {
  const token: string = jwt.sign(payload, opts.secretOrKey);
  return token;
};

export default generateJwtToken;
