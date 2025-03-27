import { Schema, model, models } from "mongoose";

const ClientSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "is required"],
    },
    email: {
      type: String,
      required: [true, "is required"],
    },
    phone: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Client = models.Clients || model("Clients", ClientSchema);

export default Client;
