import { Router } from "express";
import profileRouter from "./profile";
import eventRouter from "./event";
import homeRouter from "./home";
import offerRouter from "./offer";
import transactionRouter from "./transaction";

const userRouter = Router();

userRouter.use("/profile", profileRouter);
userRouter.use("/event", eventRouter);
userRouter.use("/home", homeRouter);
userRouter.use("/offer", offerRouter);
userRouter.use("/transaction", transactionRouter);

export default userRouter;
