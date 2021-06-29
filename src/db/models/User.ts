import { Schema, model, Document, ObjectId } from "mongoose";

export default interface User extends Document {
  email: string;
  name: string;
  userImg: string;
  age: number;
  phoneNumber: number;
  coordinates: { x: string; y: string };
  walletId: string;
  eventsRegistered: Array<{
    eventId: ObjectId;
    cart: Array<{ vendorId: ObjectId; itemName: string; quantity: number }>;
  }>;
  interestedIn: Array<string>;
  wishlistedEvents: Array<ObjectId>;
  registrationCompleted: boolean;
}

const schema = new Schema({
  email: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  name: {
    type: Schema.Types.String,
    default: "",
  },
  userImg: { type: Schema.Types.String, default: "" },
  age: {
    type: Schema.Types.Number,
  },
  phoneNumber: {
    type: Schema.Types.String,
  },
  description: {
    type: Schema.Types.String,
    default: "",
  },
  socialLink: {
    type: Schema.Types.String,
    default: "",
  },
  coordinates: {
    lat: {
      type: Schema.Types.String,
      default: "",
    },
    lon: {
      type: Schema.Types.String,
      default: "",
    },
  },
  walletId: { type: Schema.Types.String, unique: true },
  eventsRegistered: [
    {
      eventId: {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
      cart: [
        {
          vendorId: {
            type: Schema.Types.ObjectId,
            ref: "EventVendor",
          },
          itemName: {
            type: Schema.Types.String,
          },
          quantity: {
            type: Schema.Types.Number,
          },
        },
      ],
    },
  ],
  interestedIn: [
    {
      type: Schema.Types.String,
    },
  ],
  wishlistedEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  registrationCompleted: {
    type: Schema.Types.Boolean,
    default: false,
  },
});

export const userModel = model<User>("User", schema, "Users");
