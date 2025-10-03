import { NextResponse } from "next/server";
import { connectToDb } from "@/app/(Engine)/mongodb/database";
import User from "@/app/(Engine)/models/user";
import { sendEmail } from "@/app/(Engine)/actions/sendEmail";

// import nodemailer from "nodemailer";
// import { google } from "googleapis";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("search");
  await connectToDb();
  const user = await User.findOne({ email: email });
  return new NextResponse(JSON.stringify(user));
}

export async function POST(request) {
  try {
    const body = await request.json();

    const sent = await sendEmail(body);
    return new NextResponse(JSON.stringify(sent), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}

// const email_Config = };

// const sendEmail = async (body) => {
//   const { recepient_Email, OTP } = body;
//   try {
//     const accessToken = oAuth2Client.getAccessToken();
//     return new Promise((resolve, reject) => {
//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           type: "OAuth2",
//           user: USER_EMAIL,
//           clientId: CLIENT_ID,
//           clientSecret: CLIENT_SECRET,
//           refreshToken: REFRESH_TOKEN,
//           accessToken: accessToken.token,
//         },
//       });

//       transporter.sendMail(
//         {
//           from: "princewilligwe15@gmail.com",
//           to: recepient_Email,
//           subject: "Recover Password",
//           text: `Enter your OTP code: ${OTP} `,
//         },
//         (error) => {
//           if (error) {
//             console.log(error);
//             return reject({ message: "An error occurred" });
//           }
//           return resolve({ message: "Email sent successfully" });
//         }
//       );
//     });
//   } catch (error) {
//     console.log(error);
//     throw new Error("email Failed");
//   }
// };
