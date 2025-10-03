import { google } from "googleapis";
import nodemailer from "nodemailer";
import User from "@/app/(Engine)/models/user";

export const sendEmail = async (body: any) => {
  try {
    const {
      firstName,
      lastName,
      OTP,
      recepient_Email,
      subject,
      stats,
      oldMessage,
      message,
    } = body;
    const REPLY_URI = process.env.REPLY_URI;
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
    const USER_EMAIL = process.env.GMAIL_ADDRESS;
    const REDIRECT_URI = process.env.REDIRECT_URI;

    console.log({ body });
    console.log({ REFRESH_TOKEN });
    console.log({ CLIENT_SECRET });
    console.log({ CLIENT_ID });
    console.log({ USER_EMAIL });
    console.log({ REDIRECT_URI });
    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const accessToken = await oAuth2Client.getAccessToken();
    console.log({ accessToken });
    console.log("before transporter has fired");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: USER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    console.log("after transporter has fired");
    let tempUser;

    if (stats === "login" || stats === "resend") {
      const user = await User.findOne({ email: recepient_Email });
      if (user) {
        tempUser = user;
      }
    }

    let html;

    switch (stats) {
      case "register":
        html = `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        
        <div style="background-color: #4CAF50; color: white; text-align: center; padding: 16px; font-size: 20px;">
          Welcome to Our Service
        </div>

        <div style="padding: 20px; color: #333;">
          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
            Hi <strong>There</strong>,
          </p>
          <p style="font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
             Please confirm your email address by Entering the OTP below:
          </p>
          <p 
             style="display: inline-block; background-color: #4CAF50; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 4px; font-size: 16px;">
             ${OTP}
          </p>
          <p style="font-size: 12px; color: #888; margin-top: 20px;">
            If you didn’t request this, you can ignore this email.
          </p>
        </div>
      </div>
    </div>
  `;
        break;
      case "login":
        html = `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        
        <div style="background-color: #4CAF50; color: white; text-align: center; padding: 16px; font-size: 20px;">
          Welcome to Our Service
        </div>

        <div style="padding: 20px; color: #333;">
          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
            Hi <strong>${
              tempUser !== undefined ? tempUser.name : "There"
            }</strong>,
          </p>
          <p style="font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
             Please confirm your email address by Entering the OTP below:
          </p>
          <p 
             style="display: inline-block; background-color: #4CAF50; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 4px; font-size: 16px;">
             ${OTP}
          </p>
          <p style="font-size: 12px; color: #888; margin-top: 20px;">
            If you didn’t request this, you can ignore this email.
          </p>
        </div>
      </div>
    </div>
  `;
        break;
      case "client":
        html = `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        
        <div style="background-color: #4CAF50; color: white; text-align: center; padding: 16px; font-size: 20px; font-weight: 500px">
          Eureka
        </div>

        <div style="padding: 20px; color: #333;">
          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
            Hi <strong>${firstName + " " + lastName}</strong>,
          </p>
          <p style="font-size: 14px; line-height: 1.6; margin-bottom: 20px; ">
            You sent us a message.
          </p>
          <p style="font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
           Thank you for reaching out to us. Here is a copy of your message:
            <br />
            <blockquote>
              <strong>"${oldMessage}"</strong>
              <cite>– ${firstName + " " + lastName}</cite>
            </blockquote>
            <br />
            <br />
          </p>
          <p style="font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
             ${message}
          </p>
          <p style="font-size: 12px; line-height: 1.0; margin-bottom: 5px;">
             Click the link below to sign up and get started!
          </p>
          <a href="${REPLY_URI}/register"  
          target="_blank" rel="noopener noreferrer">
            <p 
             style="display: inline-block; background-color: #4CAF50; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 4px; font-size: 16px;">
             Sign Up
            </p>
          </a>
          <a href="${REPLY_URI}"  
          target="_blank" rel="noopener noreferrer">
            <p 
             style="display: inline-block; background-color: #4CAF50; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 4px; font-size: 16px;">
             See Our Services
            </p>
          </a>
          
          <p style="font-size: 12px; color: #888; margin-top: 20px;">
            If you are no longer interested or are already a client, you can ignore this email.
          </p>
        </div>
      </div>
    </div>
  `;
        break;
      default:
        html = `<div>No Mail</div>`;
    }

    const result = await transporter.sendMail({
      from: `Eureka: <${USER_EMAIL}>`,
      to: recepient_Email,
      subject: subject,
      html,
    });
    console.log("Email sent:", result);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("email Failed");
  }
};
