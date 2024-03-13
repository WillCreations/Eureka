import { revalidatePath } from 'next/cache';
import User from '../models/user';
import { connectToDb } from '../mongodb/database';
import fs from "fs";
 



export const deleteUser = async (formData) => {
    "use server"
    const { id,url } =
        Object.fromEntries(formData);
        
    console.log(formData, "formData")
    
    try {
        await connectToDb()
        await User.findByIdAndDelete(id)
        fs.unlinkSync(`./public${url}`)
    } catch (error) {
        throw new Error("failed to delete")
    }
    
    revalidatePath("/users") 
}