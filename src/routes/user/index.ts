import { Router } from "express";
import profileRouter from "./profile";
import eventRouter from "./event";

const userRouter = Router();

userRouter.use("/profile", profileRouter);
userRouter.use("/event", eventRouter);

export default userRouter;
