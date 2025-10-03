import nodemailer from "nodemailer";
import { google } from "googleapis";
export const emailAction = async (formData) => {
  "use server";

  try {
    const {
      firstName,
      lastName,
      recepient_Email,
      oldMessage,
      subject,
      message,
    } = Object.fromEntries(formData);
    console.log({
      firstName,
      lastName,
      recepient_Email,
      oldMessage,
      subject,
      message,
    });

    if (!firstName || !lastName || !recepient_Email || !subject || !message) {
      throw new Error("All fields are required");
    }
    const REPLY_URI = process.env.REPLY_URI;
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
    const USER_EMAIL = process.env.GMAIL_ADDRESS;
    const REDIRECT_URI = process.env.REDIRECT_URI;

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

    const result = await transporter.sendMail({
      from: `Eureka: <${USER_EMAIL}>`,
      to: recepient_Email,
      subject: subject,
      html: `
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
        `,
    });
    console.log("Email sent:", result);

    return {
      ok: true,
      message: result,
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: error.message };
  }
};
