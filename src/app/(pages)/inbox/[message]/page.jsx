import React from "react";
import { updateProduct } from "@/app/(Engine)/actions/updateProduct";
import EmailForm from "@/app/components/EmailForm";
import WhatsappForm from "@/app/components/WhatsappForm";
import Email from "@/app/components/Email";
import { connectToDb } from "@/app/(Engine)/mongodb/database";
import Client from "@/app/(Engine)/models/clientSchema";
import { emailAction } from "@/app/(Engine)/actions/emailAction";

const page = async ({ params }) => {
  console.log(params.message, "hello");

  connectToDb();
  const messenger = await Client.findById(params.message);
  console.log({ messenger });
  const { firstName, lastName, email, message, phone } = messenger;

  const transferObj = JSON.stringify(messenger);
  const wrapper = async (formData) => {
    "use server";
    const { subject, replyMessage } = Object.fromEntries(formData);
    const newFormData = new FormData();
    newFormData.append("firstName", firstName);
    newFormData.append("lastName", lastName);
    newFormData.append("recepient_Email", email);
    newFormData.append("subject", subject);
    newFormData.append("message", replyMessage);
    newFormData.append("oldMessage", message);

    const response = await emailAction(newFormData);
    console.log({ response });
  };

  return (
    <div className="min-h-screen text-white py-20">
      <div className="mx-10 lg:mx-28">
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
          <div className="col-span-1 p-10 min-h-[300px] rounded-md bg-white text-gray-900 italic text-justify">
            <div>{message}</div>
            <div className="flex justify-end text-green-700 capitalize">
              - {firstName ? `${firstName} ${lastName}` : "Anonymous"}
            </div>
          </div>
          <div className="col-span-1">
            <Email messenger={transferObj} />
          </div>
        </div>
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
          <div className="col-span-1">
            <EmailForm email={email} Action={wrapper} roletag="Send Email" />
          </div>
          <div className="col-span-1">
            <WhatsappForm phone={phone} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
