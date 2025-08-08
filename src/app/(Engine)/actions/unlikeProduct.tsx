import { revalidatePath } from "next/cache";
import Product from "@/app/(Engine)/models/productSchema";
import User from "@/app/(Engine)/models/user";
import { connectToDb } from "../mongodb/database";
import { checkLike } from "./checkLike";

export const unlikeProduct = async (prodId, likerId) => {
  "use server";

  try {
    connectToDb();

    const response = await checkLike(prodId, likerId);
    if (!response.ok) {
      throw new Error("product not liked");
    }

    const product = await Product.findByIdAndUpdate(
      prodId,
      {
        $pull: {
          likes: likerId,
        },
      },
      {
        new: true,
      }
    );
    const user = await User.findOne({ _id: likerId });

    revalidatePath(`/products`);

    return {
      ok: true,
      message: `${user.name} unliked ${product.name}`,
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: error.message };
  }
};
