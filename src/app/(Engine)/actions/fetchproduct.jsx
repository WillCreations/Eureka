import Product from "@/app/(Engine)/models/productSchema";
import { connectToDb } from "../mongodb/database";

export const fetchproduct = async (q, page) => {
  const regex = new RegExp(q, "i");
  console.log({ q, page });
  const ITEM_PER_PAGE = 5;

  try {
    connectToDb();
    const count = await Product.find({ name: { $regex: regex } }).count();
    const products = await Product.find({ name: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .sort({ createdAt: -1 });
    console.log(count, "countererre in server");
    return { count, products };
  } catch (error) {
    throw new Error("Failed Search");
  }
};
