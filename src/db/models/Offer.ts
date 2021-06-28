import { Schema, model, Document, ObjectId } from "mongoose";

export default interface Offer extends Document {
  name: string;
  description: string;
  scope: { userId: Array<ObjectId>; eventId: Array<ObjectId> };
  type: string;
  value: number;
}

const schema = new Schema({
  name: {
    type: Schema.Types.String,
    default: "",
    required: true,
  },
  description: {
    type: Schema.Types.String,
  },
  scope: {
    userId: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    eventId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
  type: {
    type: Schema.Types.String,
    default: "",
  },
  value: {
    type: Schema.Types.Number,
    default: 0,
  },
});

export const offerModel = model<Offer>("Offer", schema, "Offers");
