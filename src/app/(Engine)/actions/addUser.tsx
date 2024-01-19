import { revalidatePath } from 'next/cache';
import User from '../models/user';
import { connectToDb } from '../mongodb/database';
import bcrypt from 'bcrypt' 
import { redirect } from 'next/navigation';

export const addUser = async (formData) => {
    "use server"
    const {  username, email, phone, address, picture, password } =
       formData

        console.log(username, "na me wan enter")

    try {

        connectToDb()
        console.log(password, "password")
        if (password) {
            const hashed = await bcrypt.hash(password, 10)
            console.log(hashed, "hashed")

             const user = new User({
            name: username,
            email,
            phone,
            picture,
            address,
            password: hashed
        });

             Object.entries(user).forEach(([key, value]) => {                  
                if (value === "" || undefined ) {
                 delete user[key]
                } 
              })
        
                user.save()
        } else {
            const user = new User({
                name: username,
                email,
                phone,
                picture,
                address,
                password
            });
            
            
            Object.entries(user).forEach(([key, value]) => {
                if (value === "" || undefined ) {
                 delete user[key]
                } 
              })
            
          
        
            console.log(user, "wetin i return")
        user.save()

        }

        
       

    } catch (error) {
        console.log(error)
        throw new Error(" failed to add new User")
    }
 
    revalidatePath(`/users`);
    redirect(`/users/`);

}

