import { Router } from "express";

import ProfileController from "../../controllers/user/profile";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get("/get", profileController.getProfile);
profileRouter.get("/getMyEvents", profileController.getMyEvents);
profileRouter.get("/get-avatar-images", profileController.avatarImages);
profileRouter.post("/registration", profileController.registration);
profileRouter.get(
  "/registration-completed",
  profileController.registrationCompleted
);

export default profileRouter;
