import { Router } from "express";

import TransactionController from "../../controllers/user/transactions";

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.post("/pay-for-event", transactionController.payForEvent);

export default transactionRouter;
