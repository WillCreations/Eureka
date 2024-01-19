import { revalidatePath } from 'next/cache';
import User from '../models/user';
import { connectToDb } from '../mongodb/database';
 



export const deleteUser = async (formData) => {
    "use server"
    const { id } =
        Object.fromEntries(formData);
        
    console.log(formData, "formData")
    
    try {
        await connectToDb()
        await User.findByIdAndDelete(id)
    } catch (error) {
        throw new Error("failed to delete")
    }
    
    revalidatePath("/users") 
}