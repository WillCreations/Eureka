import { revalidatePath } from 'next/cache';
import Product from '../models/productSchema';
import { connectToDb } from '../mongodb/database';
import { redirect } from 'next/navigation';
import fs from "node:fs/promises"

export const updateProduct = async (formData) => {
    "use server"
    console.log(formData, "Formage")

    const { id, name, category, price, description, slug, image } = formData
        

    console.log(image, "na me wan enter")
    console.log(name, "hdhdhdhjd")
    console.log(slug, "sluggggg")
 

    try {

        connectToDb()
        

        const updateFields = {
                 name,
                 category,
                 price,
                 description,
                 slug,
                 image
        };

             Object.entries(updateFields).forEach(([key, value]) => {                  
                if (value === "" || undefined ) {
                 delete updateFields[key]
                } 
             })
        console.log(updateFields, "fields")
        
            await Product.findByIdAndUpdate(id, updateFields)
       

        
       

    } catch (error) {
        console.log(error)
        throw new Error(" failed to Update Product Info")
    }
 
    revalidatePath(`/products/${id}`);
    redirect(`/products/${id}`);

}

