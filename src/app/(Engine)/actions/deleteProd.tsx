import { revalidatePath } from "next/cache";
import Product from "../models/productSchema";
import { connectToDb } from "../mongodb/database";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "deelyafti",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const deleteProd = async (formData) => {
  "use server";
  const { id, fsUnlink, cloudDestroy } = Object.fromEntries(formData);
  console.log({ id, fsUnlink, cloudDestroy });
  const { NODE_ENV } = process.env;

  try {
    if (NODE_ENV === "development") {
      fs.unlinkSync(`./public${fsUnlink}`);
    }

    if (NODE_ENV === "production") {
      cloudinary.uploader.destroy(cloudDestroy);
    }

    console.log(formData, "formData");
    await connectToDb();
    await Product.findByIdAndDelete(id);
    revalidatePath("/users");
    return {
      ok: true,
      message: "Deleted Successfully",
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: error.message };
  }
};
