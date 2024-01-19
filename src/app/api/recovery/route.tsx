
import { NextResponse } from "next/server"
import nodemailer from 'nodemailer'

const email_Config = {
    service: 'gmail',
    auth: {
        user: "princewilligwe15@gmail.com",
        pass: process.env.GMAIL_PASS
    }
}


const sendEmail = async (body) => {
    const { recepient_Email, OTP } = body
    try {     
        
        return new Promise((resolve, reject) => {

        const transporter = nodemailer.createTransport(email_Config)
    
        transporter.sendMail({
            from: "princewilligwe15@gmail.com",
            to: recepient_Email,
            subject: "Recover Password",
            text: OTP.toString()
        }, (error) => {
            if (error) {
                console.log(error)
                return reject({message: "An error occurred"})
            }
            return resolve({message: "Email sent succesfully"})
        })
        
        })
   
        
    } catch (error) {
        console.log(error)
        throw new Error("email Failed")
    }
}

export async function POST(request) {
   try { const body = await request.json()
    console.log(body, "body")
    const sent = await sendEmail(body)
       return new NextResponse(JSON.stringify(sent), { status: 200 })
   } catch (error) {
       return new NextResponse(JSON.stringify(error), {status: 500})
   }
}
