import { Schema, model, Document } from "mongoose";

export default interface Event extends Document {
  name: string;
  parentOrg: string;
  assets: { logo: string; banner: string; otherImages: Array<string> };
  description: string;
  location: {
    humanformAddress: string;
    mapsUrl: string;
    coordinates: { lat: string; lon: string };
  };
  tags: Array<string>;
  duration: { startTimeAndDate: string; endTimeAndDate: string };
  status: string;
  faq: Array<{ question: string; answer: string }>;
  termsAndConditions: string;
  passes: Array<{
    passName: string;
    availableNumber: number;
    price: number;
    description: string;
  }>;
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
  faq: [
    {
      question: {
        type: Schema.Types.String,
      },
      answer: {
        type: Schema.Types.String,
      },
    },
  ],
  termsAndConditions: {
    type: Schema.Types.String,
  },
  passes: [
    {
      passName: {
        type: Schema.Types.String,
      },
      availableNumber: {
        type: Schema.Types.Number,
      },
      price: {
        type: Schema.Types.Number,
      },
      description: {
        type: Schema.Types.String,
      },
    },
  ],
});

export const eventModel = model<Event>("Event", schema, "Events");
