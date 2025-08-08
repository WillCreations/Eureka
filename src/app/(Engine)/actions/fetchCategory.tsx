import Category from "@/app/(Engine)/models/categorySchema";
import { connectToDb } from "../mongodb/database";

export const fetchCategory = async () => {
  try {
    connectToDb();

    const categories = await Category.find();
    return categories;
  } catch (error) {
    throw new Error("Failed Search");
  }
};
