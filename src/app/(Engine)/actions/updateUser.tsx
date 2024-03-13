import { revalidatePath } from 'next/cache';
import User from '../models/user';
import { connectToDb } from '../mongodb/database';
import bcrypt from 'bcrypt' 
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
   import { v2 as cloudinary } from "cloudinary"
import fs from "fs";
import { join } from "path"
import path from "path"

export const updateUser = async (formData) => {
    "use server"
    const { id, username, email, phone, address, picture,url, password } =
       Object.fromEntries(formData)

        console.log(username, "na me wan enter")

 



    try {

        connectToDb();
       
        (async function Run() {

            let newName = "/userimage/" + Date.now() + path.extname(picture.name)
            const pathname = join("public", newName)
            const cloudUrl = `./${pathname}`
            console.log('cloudUrl', cloudUrl)
            console.log("image: ",  picture)
            const imagebyte = await picture.arrayBuffer()
            console.log(imagebyte, "imagebyte")
            const buffer = Buffer.from(imagebyte)
            console.log("buffer: ", buffer)
            let hashed = password
            if (password) {
                hashed = await bcrypt.hash(password, 10)
                console.log(hashed, "hashed")
            }
            
            
            fs.writeFileSync(pathname, buffer)
            
            
            if (picture.name === "undefined") {
                 newName = ""
             } 
                 
            

           
           
            
            // const result = await cloudinary.uploader.upload(newName)
            // console.log('result', result.secure_url)
            console.log(`password: ${password} - newName: ${newName}`)
            
              const updateFields = {
            name: username,
            email,
            phone,
            address,
                  picture: newName,
            image: newName,
            password: hashed
        };

             Object.entries(updateFields).forEach(([key, value]) => {                  
                if (value === "" || undefined ) {
                 delete updateFields[key]
                } 
              })


           console.log(updateFields, "wetin i return")
            await User.findByIdAndUpdate(id, updateFields)

            if (picture.name !== "undefined") {
                fs.unlinkSync(`./public${url}`)
            }


        })()
        
       

    } catch (error) {
        console.log(error)
        throw new Error(" failed to Update User Info")
    }
 
    revalidatePath(`/users/${email}`);
    redirect(`/users/${email}`);

}

