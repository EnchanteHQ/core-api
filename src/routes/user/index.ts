import { Router } from "express";
import profileRouter from "./profile";
import eventRouter from "./event";
import homeRouter from "./home";

const userRouter = Router();

userRouter.use("/profile", profileRouter);
userRouter.use("/event", eventRouter);
userRouter.use("/home", homeRouter);

export default userRouter;
