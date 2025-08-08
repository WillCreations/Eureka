import { revalidatePath } from "next/cache";
import Product from "@/app/(Engine)/models/productSchema";
import User from "@/app/(Engine)/models/user";
import { connectToDb } from "../mongodb/database";

export const fetchProductLikes = async (prodId) => {
  "use server";

  try {
    connectToDb();

    const product = await Product.findOne({ _id: prodId });

    return {
      ok: true,
      message: product.likes.length,
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: error.message };
  }
};
