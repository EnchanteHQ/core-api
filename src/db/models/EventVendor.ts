import { Schema, model, Document, ObjectId } from "mongoose";

export default interface EventVendor extends Document {
  vendorId: ObjectId;
  location: {
    humanformAddress: string;
    mapsUrl: string;
    coordinates: string;
  };
  menu: Array<{ item: string; price: number; available: boolean }>;
}

const schema = new Schema({
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
  },
  location: {
    humanformAddress: {
      type: Schema.Types.String,
      default: "",
    },
    mapsUrl: {
      type: Schema.Types.String,
      default: "",
    },
    coordiantes: {
      type: Schema.Types.String,
      default: "",
    },
  },
  menu: [
    {
      item: {
        type: Schema.Types.String,
        unique: true,
      },
      price: {
        type: Schema.Types.Number,
        default: 0,
      },
      available: {
        type: Schema.Types.Boolean,
      },
    },
  ],
});

export const eventVendorModel = model<EventVendor>(
  "EventVendor",
  schema,
  "EventVendors"
);
