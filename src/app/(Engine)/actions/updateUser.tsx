import { revalidatePath } from "next/cache";
import User from "../models/user";
import { connectToDb } from "../mongodb/database";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { join } from "path";
import path from "path";

cloudinary.config({
  cloud_name: "deelyafti",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const updateUser = async (formData, formData2) => {
  "use server";
  const { NODE_ENV } = process.env;
  const { pictureFile, base64, admin, picture } = Object.fromEntries(formData2);
  const { id, name, email, code, phone, address, password } =
    Object.fromEntries(formData);

  console.log({
    id,
    name,
    email,
    phone,
    address,
    password,
    pictureFile,
    base64,
    admin,
  });

  try {
    connectToDb();
    let clouding;
    let newName;
    let phoneNum;
    let adminer = admin;

    const user = await User.findOne({ _id: id });

    const nameExists = await User.findOne({
      name,
    });
    const emailExists = await User.findOne({
      email,
    });

    const converter = (id) => {
      return id.toString();
    };

    if (nameExists) {
      const convert = converter(nameExists._id);

      if (convert !== id) {
        throw new Error("Username already exists with another user");
      }
    }

    if (emailExists) {
      const convert = converter(emailExists._id);

      if (convert !== id) {
        throw new Error("Email already exists with another user");
      }
    }

    if (NODE_ENV === "production") {
      const result = await cloudinary.uploader.upload(base64);

      await User.findByIdAndUpdate(id, {
        image: result.secure_url,
        picture: result.secure_url,
        destroy: result.public_id,
      });

      clouding = result.public_id;

      cloudinary.uploader.destroy(user.destroy);
      revalidatePath("/");
    }

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
        if (picture.includes("/userimage/")) {
          fs.unlinkSync(`./public${picture}`);
        }
        clouding = newName;
      }
    }

    let hashed = password;

    if (admin === "undefined") {
      adminer = false;
    }

    if (password) {
      hashed = await bcrypt.hash(password, 10);
      console.log(hashed, "hashed");
    }

    const updateFields = {
      name,
      email,
      phone: phone,
      countryCode: code,
      address,
      picture: newName,
      image: newName,
      destroy: clouding,
      password: hashed,
      admin: adminer,
    };

    Object.entries(updateFields).forEach(([key, value]) => {
      if (value === "" || undefined) {
        delete updateFields[key];
      }
    });

    console.log(updateFields, "wetin i return");
    await User.findByIdAndUpdate(id, updateFields);
    revalidatePath(`/`);
    revalidatePath(`/users/${email}`);
    return {
      ok: true,
      message: `${user.name} Updated Successfully`,
      redirect: email,
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: error.message };
  }

  // redirect(`/users/${email}`);
};
