import { Schema, model, Document, ObjectId } from "mongoose";

export default interface Vendor extends Document {
  name: string;
  email: string;
  password: string;
  eventId: ObjectId;
  walletId: string;
  shopName: string;
}

const schema = new Schema({
  name: {
    type: Schema.Types.String,
    default: "",
  },
  email: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
  walletId: { type: Schema.Types.String, unique: true },
  shopName: {
    type: Schema.Types.String,
    default: "",
  },
});

export const vendorModel = model<Vendor>("Vendor", schema, "Vendors");
