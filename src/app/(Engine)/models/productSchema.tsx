import { ObjectId } from "mongodb";
import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "is required"],
    },
    description: {
      type: String,
      required: [true, "email is required"],
    },

    price: {
      type: Number,
      required: [true, "password is required"],
    },

    category: {
      type: String,
      required: [true, "product category"],
    },

    image: {
      type: String,
      required: [true, " product image"],
    },
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],

    totalRates: {
      type: Number,
    },

    averageRate: {
      type: Number,
    },

    alt_image: {
      type: String,
      required: [true, "alternative image"],
    },

    destroy: {
      type: String,
      required: [true, "destroy image"],
    },

    slug: {
      type: String,
      required: [true, "product slug"],
    },

    stock: {
      type: Number,
      required: [true, "product unit"],
    },
    count: {
      type: Number,
      required: [true, "product count"],
    },
  },
  { timestamps: true }
);

console.log("Hey prod Schema");

const Product = models.Products || model("Products", ProductSchema);

export default Product;
