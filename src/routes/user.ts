import { Router } from "express";
import UserController from "../controllers/user";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/profile", userController.profile);

export default userRouter;
