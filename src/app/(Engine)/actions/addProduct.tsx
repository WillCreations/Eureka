import { revalidatePath } from 'next/cache';
import Product from '../models/productSchema';
import { connectToDb } from '../mongodb/database';
import { redirect } from 'next/navigation';
import { v2 as cloudinary } from "cloudinary"
import fs from "fs";
import { join } from "path"
import path from "path"

cloudinary.config({
    cloud_name: "deelyafti",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})


export const addProduct = async (formData) => {
    "use server"
    const { name, category, price, description, slug, image, base64 } =
           Object.fromEntries(formData);

    console.log(name, "na me wan enter")

    try {

        connectToDb();
        console.log('loader', cloudinary.uploader);
        let clouding;
        let alt;

        (async function Run() {

            let newName = "/prodimage/" + Date.now() + path.extname(image.name)
            const pathname = join("public", newName)
            const cloudUrl = `./${pathname}`
            console.log('cloudUrl', cloudUrl)
            console.log("image: ",  image)
            const imagebyte = await image.arrayBuffer()
            console.log(imagebyte, "imagebyte")
            const buffer = Buffer.from(imagebyte)
            console.log("buffer: ", buffer)
            
            let cate = category
            if (category === "--select--") {
                 cate = ""
            }

            if (base64) {
              const result = await cloudinary.uploader.upload(base64)
                console.log('result', result.secure_url)
                newName= result.secure_url
                 clouding = result.public_id
                 alt = result.secure_url
            } else {
                if (image.name === "undefined") {
                 newName = ""
                } else {
                    fs.writeFileSync(pathname, buffer)
                 const result = await cloudinary.uploader.upload(cloudUrl)
                 console.log('result', result.secure_url)
                 clouding = result.public_id
                 alt = result.secure_url
            }}

            
            console.log(`cate: ${cate} - newName: ${newName}`)
            
            const product = new Product({
                name,
                category: cate,
                price,
                description,
                slug,
                image: newName,
                alt_image: alt,
                destroy: clouding,
                stock: 1
            });


            console.log(product, "wetin i return")
            product.save()


        })()





    } catch (error) {
        console.log(error)

        throw new Error(" failed to add new Product")
    }

    revalidatePath(`/product_panel`);
    redirect(`/product_panel`);
}

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