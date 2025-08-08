import { revalidatePath } from "next/cache";
import Product from "../models/productSchema";
import { connectToDb } from "../mongodb/database";
import { redirect } from "next/navigation";
import { join } from "path";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "deelyafti",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const updateProduct = async (formData, formData2) => {
  "use server";

  const { NODE_ENV } = process.env;
  const { id, name, category, price, description, slug, stock, image } =
    Object.fromEntries(formData);
  const { pictureFile, base64, imageUrl } = Object.fromEntries(formData2);

  console.log({
    id,
    name,
    category,
    price,
    description,
    slug,
    stock,
    image,
    pictureFile,
    base64,
  });

  try {
    connectToDb();
    let clouding;
    let alt;
    let newName;

    const product = await Product.findOne({ _id: id });

    if (NODE_ENV === "production") {
      const result = await cloudinary.uploader.upload(base64);

      await Product.findByIdAndUpdate(id, {
        image: result.secure_url,
        destroy: result.public_id,
      });

      clouding = result.public_id;

      cloudinary.uploader.destroy(product.destroy);
      revalidatePath("/");
    }

    if (NODE_ENV === "development") {
      if (pictureFile.name) {
        newName = "/prodimage/" + Date.now() + path.extname(pictureFile.name);
        const pathname = join("public", newName);
        const cloudUrl = `./${pathname}`;
        console.log("cloudUrl", cloudUrl);
        console.log("image: ", pictureFile);
        const imagebyte = await pictureFile.arrayBuffer();
        console.log(imagebyte, "imagebyte");
        const buffer = Buffer.from(imagebyte) as any;
        console.log("buffer: ", buffer);
        fs.writeFileSync(pathname, buffer);
        if (imageUrl.includes("/prodimage/")) {
          fs.unlinkSync(`./public${imageUrl}`);
        }

        alt = newName;
        clouding = newName;
      }
    }
    const slugg = slug.split(" ").join("_");
    const updateFields = {
      name,
      category,
      price,
      description,
      slug: slugg,
      stock,
      image: newName,
      alt_image: alt,
      destroy: clouding,
    };

    Object.entries(updateFields).forEach(([key, value]) => {
      if (value === "" || value === undefined || value === "--select--") {
        delete updateFields[key];
      }
    });

    console.log(updateFields, "fields");
    const prodd = await Product.findByIdAndUpdate(id, updateFields);

    revalidatePath(`/products/${id}`);

    return {
      ok: true,
      message: `${prodd.name} updated successfully`,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
};
