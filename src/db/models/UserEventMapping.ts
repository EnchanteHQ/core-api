import { Schema, model, Document, ObjectId } from "mongoose";

export default interface UserEventMapping extends Document {
  eventId: ObjectId;
  userId: ObjectId;
  transactions: Array<ObjectId>;
  budget: ObjectId;
  passType: ObjectId;
}

const schema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
  budget: {
    type: Schema.Types.ObjectId,
    ref: "Budget",
  },
  passType: {
    type: Schema.Types.ObjectId,
  },
});

export const userEventMappingModel = model<UserEventMapping>(
  "UserEventMapping",
  schema,
  "UserEventMappings"
);
