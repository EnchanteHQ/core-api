import { Router } from "express";

import OfferController from "../../controllers/user/offer";

const offerRouter = Router();
const offerController = new OfferController();

offerRouter.get("/:id", offerController.getOfferById);

export default offerRouter;
