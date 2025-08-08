import { model, models, Schema } from "mongoose";
const { ObjectId } = Schema.Types;

const RateSchema = new Schema(
  {
    productId: {
      type: ObjectId,
      ref: "Product",
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    resultId: {
      type: ObjectId,
      ref: "Result",
    },
    rate: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Rate = models.Rate || model("Rate", RateSchema);

export default Rate;
