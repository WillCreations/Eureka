import { revalidatePath } from 'next/cache';
import Product from '../models/productSchema';
import { connectToDb } from '../mongodb/database';
import { v2 as cloudinary } from "cloudinary"
import fs from "fs";
 
cloudinary.config({
    cloud_name: "deelyafti",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})


export const deleteProd = async (formData) => {
    "use server"
    const { id, url, cloud } =
        Object.fromEntries(formData);
    console.log("url: ", url)

    fs.unlinkSync(`./public${url}`)
    cloudinary.uploader.destroy(cloud)
        
    console.log(formData, "formData")
    
    try {
        await connectToDb()
        await Product.findByIdAndDelete(id)
    } catch (error) {
        throw new Error("failed to delete")
    }
    
    revalidatePath("/users") 
}