import { revalidatePath } from 'next/cache';
import User from '../models/user';
import { connectToDb } from '../mongodb/database';
import fs from "fs";
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: "deelyafti",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})
 



export const deleteUser = async (formData) => {
    "use server"
    const { id,url,cloud } =
        Object.fromEntries(formData);
        
    console.log(formData, "formData")
    
    try {
        await connectToDb()
         cloudinary.uploader.destroy(cloud)
        await User.findByIdAndDelete(id)
        // fs.unlinkSync(`./public${url}`)
    } catch (error) {
        throw new Error("failed to delete")
    }
    
    revalidatePath("/users") 
}