import express, { Application, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";

import { connect } from "./db/index";

import router from "./routes/index";
import authRouter from "./routes/auth";

import { SuccessResponse } from "./core/ApiResponse";

dotenv.config();

process.on("uncaughtException", (error) => {
  console.log("Error:>>", error);
});

const app: Application = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

connect();

const userAuthMiddleware = passport.authenticate("userStrategy", {
  session: false,
});

app.get("/", (_, res: Response) => {
  new SuccessResponse("Enchante", {
    status: "Up and ready to race!",
  }).send(res);
});

app.use("/v1", router);
app.use("/auth", authRouter);

export default app;
