import React from "react";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectToDb } from "@/app/(Engine)/mongodb/database";
import Email from "@/app/components/Email";

const email_Config = {
  service: "gmail",
  auth: {
    user: "princewilligwe15@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
};

export const sendEmail = (formData) => {
  const { firstName, lastName, email, subject, message } =
    Object.fromEntries(formData);
  try {
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport(email_Config);
      const newMessage = { firstName, lastName, message };
      const messenger = JSON.stringify(newMessage);
      const result = Email({ messenger });

      console.log({ result });

      transporter.sendMail(
        {
          from: "princewilligwe15@gmail.com",
          to: email,
          subject: subject,
          html: result,
        },
        (error) => {
          if (error) {
            console.log(error);
            return reject({ message: "An error occurred" });
          }
          return resolve({ message: "Email sent succesfully" });
        }
      );
    });
  } catch (error) {
    console.log(error);
    throw new Error("email Failed");
  }
};
