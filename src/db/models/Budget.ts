import { Schema, model, Document, ObjectId } from "mongoose";

export default interface Budget extends Document {
  userId: ObjectId;
  eventId: ObjectId;
  maxBudget: number;
  amountSpent: number;
}

const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  maxBudget: {
    type: Schema.Types.Number,
  },
  amountSpent: {
    type: Schema.Types.Number,
    default: 0,
  },
});

export const budgetModel = model<Budget>("Budget", schema, "Budgets");
