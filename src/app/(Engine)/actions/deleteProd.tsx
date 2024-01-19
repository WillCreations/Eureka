import { revalidatePath } from 'next/cache';
import Product from '../models/productSchema';
import { connectToDb } from '../mongodb/database';
 



export const deleteProd = async (formData) => {
    "use server"
    const { id } =
        Object.fromEntries(formData);
        
    console.log(formData, "formData")
    
    try {
        await connectToDb()
        await Product.findByIdAndDelete(id)
    } catch (error) {
        throw new Error("failed to delete")
    }
    
    revalidatePath("/users") 
}