import { revalidatePath } from "next/cache";
import Product from "../models/productSchema";
import { connectToDb } from "../mongodb/database";
import { redirect } from "next/navigation";
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

export const addProduct = async (formData, formData2) => {
  "use server";
  const { name, category, price, description, stock, slug } =
    Object.fromEntries(formData);
  const { base64, pictureFile } = Object.fromEntries(formData2);

  const { NODE_ENV } = process.env;

  console.log(name, "na me wan enter");

  try {
    connectToDb();

    let clouding = "/productModel.svg";
    let alt = "/productModel.svg";
    let newName = "/productModel.svg";
    let cate = category;

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
        alt = newName;
        clouding = newName;
      }
    }

    console.log(`cate: ${cate} - newName: ${newName}`);

    const slugg = slug.split(" ").join("_");

    console.log({ slug });

    const product = new Product({
      name,
      category: cate,
      price,
      description,
      slug: slugg,
      image: newName,
      alt_image: alt,
      destroy: clouding,
      stock,
      count: 1,
    });

    console.log(product, "wetin i return");
    product.save();

    if (NODE_ENV === "production") {
      const result = await cloudinary.uploader.upload(base64);

      await Product.findByIdAndUpdate(product._id, {
        image: result.secure_url,
        destroy: result.public_id,
        alt_image: result.secure_url,
      });

      cloudinary.uploader.destroy(product.destroy);
    }

    revalidatePath(`/product_panel`);

    return {
      ok: true,
      message: `${product.name} added successfully`,
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: error.message };
  }
};

// if (request.method === 'POST') {
//         const body = await request.formData()
//         const image = body.get("image")
//         console.log(image, "gbe bodie")
//         console.log(request.file, "Files straight up")
//         const newName = "avatar/" + Date.now() + path.extname(image.name)
//         const pathname = join("public", newName)

//         const imagebyte = await image.arrayBuffer()
//         console.log(imagebyte, "imagebyte")
//         const buffer = Buffer.from(imagebyte)
//         console.log(buffer, " buffer")
//         await writeFile(pathname, buffer)

//         console.log(pathname, "path of upload")
//         return new NextResponse( buffer, { status: 200 })

//     }
