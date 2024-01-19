import multer from "multer"
import { revalidatePath } from 'next/cache';
import Image from '../models/imageSchema';
import { connectToDb } from '../mongodb/database';
import { redirect } from 'next/navigation';
import path from "path"
import { NextResponse } from "next/server";

export const uploader = async (formData) => {
    "use server"
    const { image } = Object.fromEntries(formData)

  console.log(formData, "frotmatter")

        console.log(image, "na me wan enter")

    try {

        const storage = multer.diskStorage({
            destination: (req, image, cb) => {
                cb(null, "public") 
            },

            filename: (req, image, cb) =>  {
                console.log(image, "vivi imagination")
                cb(null, Date.now() + path.extname(image.name))
            }
        
        })

        const upload = multer({storage: storage})
        connectToDb()
       
        upload.single(image)
       
      

       
    
        
        const product = new Image({
            name: image.name,
            image,
            
        });

  
        console.log(product, "wetin i return")
        product.save()

    

    } catch (error) {
        console.log(error)
        throw new Error(" failed to add new Product")
    }
 
    revalidatePath(`/users`);
    redirect(`/users`);

}