import { Router } from "express";

import HomeController from "../../controllers/user/home";

const homeRouter = Router();
const homeController = new HomeController();

homeRouter.get("/", homeController.getHomePage);

export default homeRouter;
