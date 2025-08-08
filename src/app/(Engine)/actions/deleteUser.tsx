import { revalidatePath } from "next/cache";
import User from "../models/user";
import { connectToDb } from "../mongodb/database";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "deelyafti",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const deleteUser = async (formData) => {
  "use server";
  const { id, fsUnlink, cloudDestroy } = Object.fromEntries(formData);
  console.log({ id, fsUnlink, cloudDestroy });

  const { NODE_ENV } = process.env;
  try {
    await connectToDb();

    if (NODE_ENV === "development") {
      fs.unlinkSync(`./public${fsUnlink}`);
    }

    if (NODE_ENV === "production") {
      cloudinary.uploader.destroy(cloudDestroy);
    }

    const user = await User.findByIdAndDelete(id);
    console.log({ user });

    revalidatePath("/users");
    return { ok: true, message: `deleted successfully` };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
};
