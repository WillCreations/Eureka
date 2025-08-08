import { revalidatePath } from "next/cache";
import User from "../models/user";
import { connectToDb } from "../mongodb/database";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { join } from "path";
import path from "path";

export const addUser = async (formData, formData2) => {
  "use server";
  const { name, email, phone, address, code, password } =
    Object.fromEntries(formData);
  const { base64, pictureFile, admin } = Object.fromEntries(formData2);
  const { NODE_ENV } = process.env;
  console.log(name, "na me wan enter");
  console.log(admin, "admin");

  try {
    connectToDb();
    let clouding;
    let newName;
    let hashed;

    if (NODE_ENV === "development") {
      if (pictureFile.name) {
        newName = "/userimage/" + Date.now() + path.extname(pictureFile.name);
        const pathname = join("public", newName);
        const cloudUrl = `./${pathname}`;
        console.log("cloudUrl", cloudUrl);
        console.log("image: ", pictureFile);
        const imagebyte = await pictureFile.arrayBuffer();
        console.log(imagebyte, "imagebyte");
        const buffer = Buffer.from(imagebyte) as any;
        console.log("buffer: ", buffer);
        fs.writeFileSync(pathname, buffer);
      }
    }

    if (password) {
      hashed = await bcrypt.hash(password, 10);
      console.log(hashed, "hashed");
    }

    const user = await User.create({
      name,
      email,
      phone,
      countryCode: code,
      picture: newName,
      image: newName,
      address,
      destroy: clouding,
      password: hashed,
      admin,
    });

    // Object.entries(user).forEach(([key, value]) => {
    //   if (value === "" || undefined) {
    //     delete user[key];
    //   }
    // });

    console.log(user, "wetin i return");
    user.save();

    if (NODE_ENV === "production") {
      const result = await cloudinary.uploader.upload(base64);

      await User.findByIdAndUpdate(user._id, {
        image: result.secure_url,
        destroy: result.public_id,
      });

      clouding = result.public_id;

      cloudinary.uploader.destroy(user.destroy);
    }

    revalidatePath(`/users`);

    return { ok: true, message: `${user.name} registered successfully` };
  } catch (error) {
    return { ok: false, message: error.message };
  }
  redirect(`/users`);
};
