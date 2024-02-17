import { connectToDb } from "@/app/(Engine)/mongodb/database";
import User from "@/app/(Engine)/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"


export async function POST(request) {
    connectToDb()
    
    const body = await request.json();
    const { name, email, password } = body.data;
    console.log(body)

    if (!name || !email || !password) {
        return new NextResponse( "missing name, email, password", {status: 400})
    }
    

    const userExists = await User.findOne({
        email,
    })
    
    

           
    if (!userExists) {
                   
        console.log("user doesn't exist oh, creating one")
        const hashedPassword = await bcrypt.hash(password, 10)
                    
        const newuser = await User.create({
            name,
            email,
            password: hashedPassword
        })
        console.log(newuser, "newuser")
         return new NextResponse(JSON.stringify(newuser))
    } else {
        console.log(userExists.email)
        return new NextResponse( JSON.stringify({error: "email already exists"}), {status: 400})
    }
    

}