import { Router } from "express";

import ProfileController from "../../controllers/user/profile";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get("/get", profileController.getProfile);
profileRouter.get("/get-avatar-images", profileController.avatarImages);
profileRouter.post("/first-login", profileController.firstLogin);
profileRouter.get("/filled-first-login", profileController.filledFirstLogin);

export default profileRouter;
