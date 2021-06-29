import { Router } from "express";

import EventController from "../../controllers/user/event";

const eventRouter = Router();
const eventController = new EventController();

eventRouter.get("/:id", eventController.getEventById);

export default eventRouter;
