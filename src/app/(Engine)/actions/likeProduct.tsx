import { revalidatePath } from "next/cache";
import Product from "@/app/(Engine)/models/productSchema";
import User from "@/app/(Engine)/models/user";
import { connectToDb } from "../mongodb/database";

export const likeProduct = async (prodId, likerId) => {
  "use server";
  console.log({ prodId, likerId });
  try {
    connectToDb();
    const product = await Product.findByIdAndUpdate(
      prodId,
      {
        $push: {
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
      message: `${user.name} liked ${product.name}`,
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: error.message };
  }
};
