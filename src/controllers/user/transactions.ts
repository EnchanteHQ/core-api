import { Request, Response } from "express";
import { budgetModel } from "../../db/models/Budget";
import { eventModel } from "../../db/models/Event";
import { transactionModel } from "../../db/models/Transaction";
import { userEventMappingModel } from "../../db/models/UserEventMapping";

class transactionController {
  payForEvent = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user.id;
    const { eventId, passId, rapydId, offerId } = req.body;
    // console.log(eventId);

    const eventFound = await eventModel.findById(eventId);
    let userPass: {
      id: string;
      passName: string;
      availableNumber: number;
      price: number;
      description: string;
    };

    console.log(eventFound);

    eventFound.passes.forEach(
      (pass: {
        id: string;
        passName: string;
        availableNumber: number;
        price: number;
        description: string;
      }) => {
        // console.log(pass);
        if (pass.id === passId) {
          userPass = pass;
          pass.availableNumber -= 1;
        }
      }
    );
    const updatedEvent = await eventModel.findByIdAndUpdate(
      eventId,
      eventFound,
      { new: true }
    );
    console.log(updatedEvent);

    const budgetFound = await budgetModel.findOne({ userId, eventId });
    if (budgetFound) {
      budgetFound.amountSpent += userPass.price;

      const updatedBudget = await budgetModel.findOneAndUpdate(
        { userId, eventId },
        budgetFound,
        { new: true }
      );
      console.log(updatedBudget);
    }

    // TODO: SEARCH IN ADMINMODEL TO FIND ADMIN THAT HAS EVENTID
    // SEARCH OFFERS FROM OFFERID AND CHECK IF THEY ARE ELIGIBLE
    // TO REDEEM THE OFFER
    // USE MONGO SESSION
    // WRAP INSIDE A TRY CATCH

    const newTransaction = await transactionModel.create({
      senderId: userId,
      receiverId: "adminId",
      eventId,
      amount: userPass.price,
      offerId: "offerid",
      type: "event-entry",
      transactionStatus: "success",
      rapydId,
    });
    console.log(newTransaction);

    // console.log(budgetFound);

    const eventsOfUser = await userEventMappingModel.find({ userId });

    res.send({ eventsOfUser, eventFound });
  };
}

export default transactionController;
