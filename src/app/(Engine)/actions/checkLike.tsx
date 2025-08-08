import { revalidatePath } from "next/cache";
import Product from "@/app/(Engine)/models/productSchema";
import User from "@/app/(Engine)/models/user";
import { connectToDb } from "../mongodb/database";

export const checkLike = async (prodId, likerId) => {
  "use server";

  try {
    connectToDb();
    const user = await User.findOne({ _id: likerId });
    const exist = await Product.findOne({
      _id: prodId,
      likes: { $in: [likerId] },
    });
    const existProd = await Product.findOne({
      _id: prodId,
    });
    if (!exist) {
      throw new Error(` has not liked yet`);
    }

    return {
      ok: true,
      message: `${user?.name} has liked ${exist?.name}`,
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: error.message };
  }
};
