import { revalidatePath } from 'next/cache';
import User from '../models/user';
import { connectToDb } from '../mongodb/database';
import bcrypt from 'bcrypt' 
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export const updateUser = async (formData) => {
    "use server"
    const { id, username, email, phone, address, picture, password, password2 } =
       formData;

        console.log(username, "na me wan enter")

    try {

        connectToDb()
        console.log(password, "password")
        // if (password2) {
        //     if (password !== password2) {
        //         throw new Error("passwords don't match")
        //     }
        // }
        

        if (password) {
            const hashed = await bcrypt.hash(password, 10)
            console.log(hashed, "hashed")

            const updateFields = {
            name: username,
            email,
            phone,
            address,
            picture,
            password: hashed
        };

             Object.entries(updateFields).forEach(([key, value]) => {                  
                if (value === "" || undefined ) {
                 delete updateFields[key]
                } 
              })
        
            await User.findByIdAndUpdate(id, updateFields)
        } else {
            const updateFields = {
                name: username,
                email,
                phone,
                address,
                picture,
                password
            };
            
            
            Object.entries(updateFields).forEach(([key, value]) => {
                if (value === "" || undefined ) {
                 delete updateFields[key]
                } 
              })
            
          
        
            console.log(updateFields, "wetin i return")
            await User.findByIdAndUpdate(id, updateFields)

        }

        
       

    } catch (error) {
        console.log(error)
        throw new Error(" failed to Update User Info")
    }
 
    revalidatePath(`/users/${username}`);
    redirect(`/users/${username}`);

}

