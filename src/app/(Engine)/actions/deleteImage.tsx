import { revalidatePath } from "next/cache";
import Product from "../models/productSchema";
import User from "../models/user";
import { connectToDb } from "../mongodb/database";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "deelyafti",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const deleteImage = async (deleteInfo) => {
  "use server";
  const { id, fsUnlink, cloudDestroy, itemType } = deleteInfo;
  console.log({ id, fsUnlink, cloudDestroy, itemType });
  const { NODE_ENV } = process.env;

  try {
    await connectToDb();

    if (NODE_ENV === "development") {
      if (!fsUnlink) {
        throw new Error(`Image does not exist`);
      }

      if (fs.existsSync(`./public${fsUnlink}`)) {
        fs.unlinkSync(`./public${fsUnlink}`);
      } else {
        throw new Error("Image not found");
      }
    }

    if (NODE_ENV === "production") {
      cloudinary.uploader.destroy(cloudDestroy);
    }
    if (itemType === "user") {
      await User.findByIdAndUpdate(id, { image: "", destroy: "", picture: "" });
      revalidatePath(`/users/${id}`);
    } else {
      await Product.findByIdAndUpdate(id, { image: "", destroy: "" });
      revalidatePath(`/products/${id}`);
    }
    return {
      ok: true,
      message: "Image Deleted Successfully",
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: error.message };
  }
};
