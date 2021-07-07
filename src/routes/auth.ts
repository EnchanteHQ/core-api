import { Router } from "express";

import UserAuthController from "../controllers/user/auth";
import AdminAuthController from "../controllers/admin/auth";

const authRouter = Router();
const userAuthController = new UserAuthController();
const adminAuthController = new AdminAuthController();

authRouter.post("/google", userAuthController.googleAuth);
authRouter.post("/login", adminAuthController.login);
authRouter.post("/register", adminAuthController.register);

export default authRouter;
