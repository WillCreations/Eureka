import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectToDb } from "@/app/(Engine)/mongodb/database";
import User from "@/app/(Engine)/models/user";
import { google } from "googleapis";

const sendEmail = async (body) => {
  try {
    const { recepient_Email, OTP } = body;
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
    const USER_EMAIL = process.env.GMAIL_ADDRESS;
    const REDIRECT_URI = process.env.REDIRECT_URI;

    console.log(body, "body");
    console.log(REFRESH_TOKEN, "Refresh Token");
    console.log(CLIENT_SECRET, "Client Secret");
    console.log(CLIENT_ID, "Client Id");
    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    const accessToken = await oAuth2Client.getAccessToken();
    console.log("save point");
    console.log(accessToken, "accessToken");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: USER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    console.log("after transporter has fired");

    const result = await transporter.sendMail({
      from: "princewilligwe15@gmail.com",
      to: recepient_Email,
      subject: "Recover Password",
      text: `Enter your OTP code: ${OTP}`,
    });
    console.log("Email sent:", result);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("email Failed");
  }
};

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
