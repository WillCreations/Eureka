import { revalidatePath } from 'next/cache';
import Product from '../models/productSchema';
import { connectToDb } from '../mongodb/database';
import { redirect } from 'next/navigation';
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: "deelyafti",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})


export const addProduct = async (formData) => {
    "use server"
    const { name, category, price, description, slug, image, stock } =
        formData;

        console.log(name, "na me wan enter")

    try {

        connectToDb();
        console.log('loader', cloudinary.uploader);
        
        (async function Run() {
            // const result = await cloudinary.uploader.upload(image)
            // console.log('result', result.secure_url)


        const product = new Product({
            name,
            category,
            price,
            description,
            slug,
            image,
            // alt_image: result.secure_url,
            alt_image: image,
            stock
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

