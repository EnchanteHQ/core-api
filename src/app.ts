import express, { Application, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";

import { connect } from "./db/index";

import userRouter from "./routes/index";
import adminRouter from "./routes/admin";

import authRouter from "./routes/auth";

import { InternalErrorResponse, SuccessResponse } from "./core/ApiResponse";
import RapydApi from "./util/axios";
import miscRouter from "./routes/misc";

dotenv.config();

process.on("uncaughtException", (error) => {
  console.error("Error:>>", error);
});

const app: Application = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

connect();

const userAuthMiddleware = passport.authenticate("userStrategy", {
  session: false,
});

const adminAuthMiddleware = passport.authenticate("adminStrategy", {
  session: false,
});
app.get("/", (_, res: Response) => {
  new SuccessResponse("Enchante", {
    status: "Up and ready to race in Formula 0001: Rapyd Fintech Grand Prix!",
  }).send(res);
});

app.get("/test", async (_, res: Response) => {
  try {
    const data = await RapydApi.get("/data/countries");
    console.log(data.data);
    new SuccessResponse("Success in error", data.data).send(res);
  } catch (e) {
    console.error("Error in test route");
    new InternalErrorResponse("Error in test route", {}).send(res);
  }
});

app.use("/v1", userAuthMiddleware, userRouter);
app.use("/v2", adminAuthMiddleware, adminRouter);
app.use("/auth", authRouter);
app.use("/misc", miscRouter);

export default app;
