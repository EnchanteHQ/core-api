import { Router } from "express";

import AuthController from "../controllers/auth";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/google", authController.googleAuth);

export default authRouter;
