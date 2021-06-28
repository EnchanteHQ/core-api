import { Schema, model, Document, ObjectId } from "mongoose";

export default interface Transaction extends Document {
  senderId: ObjectId;
  receiverId: ObjectId;
  eventId: ObjectId;
  amount: number;
  offerId: ObjectId;
  type: string;
  transactionStatus: string;
  rapydId: string;
}

const schema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
  amount: {
    type: Schema.Types.Number,
  },
  offerId: {
    type: Schema.Types.ObjectId,
    ref: "Offer",
  },
  type: {
    type: Schema.Types.String,
  },
  transactionStatus: {
    type: Schema.Types.String,
  },
  rapydId: {
    type: Schema.Types.String,
  },
});

export const transactionModel = model<Transaction>(
  "Transaction",
  schema,
  "Transactions"
);
