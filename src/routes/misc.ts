import { Router } from "express";
import MiscController from "../controllers/misc/vendor";

const miscRouter = Router();

const miscController = new MiscController();

miscRouter.get("/vendor/ar-id", miscController.getVendorARID);
miscRouter.post("/vendor/ar-id", miscController.addVendorARID);

export default miscRouter;
