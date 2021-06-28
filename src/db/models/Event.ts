import { Schema, model, Document } from "mongoose";

export default interface Event extends Document {
  name: string;
  parentOrg: string;
  assets: { logo: string; banner: string; otherImages: Array<string> };
  description: string;
  location: {
    humanformAddress: string;
    mapsUrl: string;
    coordinates: string;
  };
  tags: Array<string>;
  duration: { startTimeAndDate: string; endTimeAndDate: string };
  status: string;
}

const schema = new Schema({
  name: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  parentOrg: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  assets: {
    logo: {
      type: Schema.Types.String,
    },
    banner: {
      type: Schema.Types.String,
    },
    otherImages: [
      {
        type: Schema.Types.String,
      },
    ],
  },
  description: {
    type: Schema.Types.String,
    default: "",
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
  tags: [
    {
      type: Schema.Types.String,
    },
  ],
  duration: {
    startTimeAndDate: {
      type: Schema.Types.String,
    },
    endTimeAndDate: {
      type: Schema.Types.String,
    },
  },
  status: {
    type: Schema.Types.String,
  },
});

export const eventModel = model<Event>("Event", schema, "Events");
