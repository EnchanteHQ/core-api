import { Router } from "express";
import profileRouter from "./profile";
import eventRouter from "./event";
import homeRouter from "./home";
import offerRouter from "./offer";

const userRouter = Router();

userRouter.use("/profile", profileRouter);
userRouter.use("/event", eventRouter);
userRouter.use("/home", homeRouter);
userRouter.use("/offer", offerRouter);

export default userRouter;
