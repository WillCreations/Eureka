import { revalidatePath } from 'next/cache';
import Product from '../models/productSchema';
import { connectToDb } from '../mongodb/database';
import { redirect } from 'next/navigation';
import { join } from "path"
import path from "path"
import { v2 as cloudinary } from "cloudinary"
import fs from "fs";

export const updateProduct = async (formData) => {
    "use server"
    console.log(formData, "Formage")

    const { id, name, category, price, description, slug, image, url } = Object.fromEntries(formData);
        

    console.log(image, "na me wan enter")
    console.log(name, "hdhdhdhjd")
    console.log(slug, "sluggggg")
 

    try {

        connectToDb()
      
            let newName = "/prodimage/" + Date.now() + path.extname(image.name)
             const pathname = join("public", newName)
            const cloudUrl = `./${pathname}`
            console.log('cloudUrl', cloudUrl)
            console.log("image: ",  image)
            const imagebyte = await image.arrayBuffer()
            console.log(imagebyte, "imagebyte")
            const buffer = Buffer.from(imagebyte)
            console.log("buffer: ", buffer)
            fs.writeFileSync(pathname, buffer)
             // const result = await cloudinary.uploader.upload(newName)
            // console.log('result', result.secure_url)
            if (image.name === 'undefined') {
                newName = ''
                 
            } 
        

        const updateFields = {
                 name,
                 category,
                 price,
                 description,
                 slug,
                 image: newName,
                 alt_image: newName
            };
            

             Object.entries(updateFields).forEach(([key, value]) => {                  
                if (value === "" || value === undefined ||value === "--select--") {
                 delete updateFields[key]
                } 
             })
        
            console.log(updateFields, "fields")
        await Product.findByIdAndUpdate(id, updateFields)
        
        
        if (image.name !== 'undefined') {
            fs.unlinkSync(`./public${url}`)
         }
        
           
       
      
       

    } catch (error) {
        console.log(error)
        throw new Error(" failed to Update Product Info")
        };
 
    revalidatePath(`/products/${id}`);
    redirect(`/products/${id}`);

}

