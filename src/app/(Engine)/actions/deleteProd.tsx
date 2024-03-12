import { revalidatePath } from 'next/cache';
import Product from '../models/productSchema';
import { connectToDb } from '../mongodb/database';
import { v2 as cloudinary } from "cloudinary"
import fs from "fs";
 



export const deleteProd = async (formData) => {
    "use server"
    const { id, url } =
        Object.fromEntries(formData);
    console.log("url: ", url)

    fs.unlinkSync(`./public${url}`)
        
    console.log(formData, "formData")
    
    try {
        await connectToDb()
        await Product.findByIdAndDelete(id)
    } catch (error) {
        throw new Error("failed to delete")
    }
    
    revalidatePath("/users") 
}