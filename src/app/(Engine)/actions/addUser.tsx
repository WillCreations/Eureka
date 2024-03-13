import { revalidatePath } from 'next/cache';
import User from '../models/user';
import { connectToDb } from '../mongodb/database';
import bcrypt from 'bcrypt' 
import { redirect } from 'next/navigation';
import { v2 as cloudinary } from "cloudinary"
import fs from "fs";
import { join } from "path"
import path from "path"

export const addUser = async (formData) => {
    "use server"
    const {  username, email, phone, address, picture, password } =
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

             if (picture.name === "undefined") {
                 newName = ""
            }

           
            fs.writeFileSync(pathname, buffer)
            
            // const result = await cloudinary.uploader.upload(newName)
            // console.log('result', result.secure_url)
            console.log(`password: ${password} - newName: ${newName}`)
            
            const user = new User({
                name: username,
                email,
                phone,
                picture: newName,
                image: newName,
                address,
                password: hashed
            });

             Object.entries(user).forEach(([key, value]) => {
                if (value === "" || undefined ) {
                 delete user[key]
                } 
              })


            console.log(user, "wetin i return")
            user.save()


        })()
      

        

        
       

    } catch (error) {
        console.log(error)
        throw new Error(" failed to add new User")
    }
 
    revalidatePath(`/users`);
    redirect(`/users/`);

}

