import { Router } from "express";

import ProfileController from "../../controllers/user/profile";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get("/get", profileController.getProfile);
profileRouter.post("/first-login", profileController.firstLogin);

export default profileRouter;
