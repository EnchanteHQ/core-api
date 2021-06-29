import { Router } from "express";

import ProfileController from "../../controllers/user/profile";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get("/get", profileController.getProfile);

export default profileRouter;
