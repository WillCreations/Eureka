import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    category: {
      type: String,
      unique: true,
      required: [true, "Category is required"],
    },
  },
  { timestamps: true }
);

const Category = models.Categories || model("Categories", CategorySchema);

export default Category;
