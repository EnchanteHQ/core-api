import { Schema, model, Document, ObjectId } from "mongoose";

export default interface Admin extends Document {
  email: string;
  orgName: string;
  password: string;
  eventId: Array<ObjectId>;
  walletId: string;
}

const schema = new Schema({
  email: {
    type: Schema.Types.String,
    required: true,
  },
  phoneNo: {
    type: Schema.Types.String,
    required: true,
  },
  orgName: {
    type: Schema.Types.String,
    default: "",
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  eventId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  walletId: { type: Schema.Types.String, unique: true },
});

export const adminModel = model<Admin>("Admin", schema, "Admins");
