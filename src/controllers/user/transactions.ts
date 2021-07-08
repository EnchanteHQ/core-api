import { Request, Response } from "express";
import { ClientSession, startSession } from "mongoose";
import Admin, { adminModel } from "../../db/models/Admin";
import Budget, { budgetModel } from "../../db/models/Budget";
import Offer, { offerModel } from "../../db/models/Offer";
import { eventModel } from "../../db/models/Event";
import Transaction, { transactionModel } from "../../db/models/Transaction";
import UserEventMapping, {
  userEventMappingModel,
} from "../../db/models/UserEventMapping";

class transactionController {
  payForEvent = async (req: Request, res: Response): Promise<void> => {
    const session: ClientSession = await startSession();
    session.startTransaction();

    try {
      const userId = req.user.id;
      const { eventId, passId, rapydId, offerId } = req.body;
      let offerApplicable: Offer;
      let userBudget: Budget;
      let entryInEventTransaction;
      let newUserInEvent;

      const userAlreadyInEvent = await userEventMappingModel.findOne({
        userId,
        eventId,
      });
      if (userAlreadyInEvent) {
        throw new Error("User has already paid for the event");
      }

      const eventToReducePassQuantityFound = await eventModel.findById(eventId);
      if (!eventToReducePassQuantityFound) {
        throw new Error("No such event found");
      }

      let userPass: {
        id: string;
        passName: string;
        availableNumber: number;
        price: number;
        description: string;
      };
      console.log(eventToReducePassQuantityFound);

      eventToReducePassQuantityFound.passes.forEach(
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
      if (!userPass) {
        throw new Error("No such pass exists for the given event");
      }

      const updatedEvent = await eventModel
        .findByIdAndUpdate(eventId, eventToReducePassQuantityFound, {
          new: true,
        })
        .session(session);
      console.log(updatedEvent);

      if (offerId) {
        const offerDetails = await offerModel.findById(offerId);
        console.log(offerDetails.scope.eventId);
        console.log(offerDetails.scope.userId);

        if (
          offerDetails.scope.eventId.includes(eventId) ||
          offerDetails.scope.userId.includes(userId)
        ) {
          offerApplicable = offerDetails;
        } else {
          throw new Error("Offer cannot be used in this event by you");
        }
      }

      const budgetFound = await budgetModel.findOne({ userId, eventId });
      if (budgetFound) {
        if (offerApplicable) {
          budgetFound.amountSpent += userPass.price - offerApplicable.value;
        } else {
          budgetFound.amountSpent += userPass.price;
        }

        const updatedBudget = await budgetModel
          .findOneAndUpdate({ userId, eventId }, budgetFound, { new: true })
          .session(session);
        console.log(updatedBudget);
        userBudget = updatedBudget;
      }

      const adminOfEvent: Admin = await adminModel.findOne({ eventId });
      if (!adminOfEvent) {
        throw new Error("No such event exists");
      }

      if (userBudget && offerApplicable) {
        entryInEventTransaction = await transactionModel.create(
          [
            {
              senderId: userId,
              receiverId: adminOfEvent.id,
              eventId,
              amount: userPass.price - offerApplicable.value,
              offerId: offerApplicable.id,
              type: "event-entry",
              transactionStatus: "success",
              rapydId,
            },
          ],
          { session }
        );
        newUserInEvent = await userEventMappingModel.create(
          {
            eventId,
            userId,
            transactions: entryInEventTransaction.id,
            budget: userBudget.id,
            passType: userPass.id,
          },
          { session }
        );
      } else if (userBudget && !offerApplicable) {
        entryInEventTransaction = await transactionModel.create(
          {
            senderId: userId,
            receiverId: adminOfEvent.id,
            eventId,
            amount: userPass.price,
            type: "event-entry",
            transactionStatus: "success",
            rapydId,
          },
          { session }
        );
        newUserInEvent = await userEventMappingModel.create(
          {
            eventId,
            userId,
            transactions: entryInEventTransaction.id,
            budget: userBudget.id,
            passType: userPass.id,
          },
          { session }
        );
      } else if (!userBudget && offerApplicable) {
        entryInEventTransaction = await transactionModel.create(
          {
            senderId: userId,
            receiverId: adminOfEvent.id,
            eventId,
            amount: userPass.price - offerApplicable.value,
            offerId: offerApplicable.id,
            type: "event-entry",
            transactionStatus: "success",
            rapydId,
          },
          { session }
        );
        newUserInEvent = await userEventMappingModel.create(
          {
            eventId,
            userId,
            transactions: entryInEventTransaction.id,
            passType: userPass.id,
          },
          { session }
        );
      } else if (!userBudget && !offerApplicable) {
        entryInEventTransaction = await transactionModel.create(
          {
            senderId: userId,
            receiverId: adminOfEvent.id,
            eventId,
            amount: userPass.price,
            type: "event-entry",
            transactionStatus: "success",
            rapydId,
          },
          { session }
        );
        newUserInEvent = await userEventMappingModel.create(
          {
            eventId,
            userId,
            transactions: entryInEventTransaction.id,
            passType: userPass.id,
          },
          { session }
        );
      }
      await session.commitTransaction();

      res.send({
        entryInEventTransaction,
        newUserInEvent,
      });
    } catch (err) {
      await session.abortTransaction();

      console.log(err);
    } finally {
      session.endSession();
    }
  };
}

export default transactionController;
