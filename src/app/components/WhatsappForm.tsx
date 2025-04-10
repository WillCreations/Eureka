"use client";

import React from "react";
import { useRouter } from "next/navigation";

const WhatsappForm = ({ phone }) => {
  const router = useRouter();

  const whatsapper = async (formData) => {
    const { phone, message } = Object.fromEntries(formData);
    console.log({ phone, message });
    router.push(`https://wa.me/${phone}?text=${message}`);
    console.log("whatsapp message sent");
  };
  return (
    <form className="my-5 pb-5 col-span-2 lg:col-span-1" action={whatsapper}>
      <div className="relative my-5">
        <input
          className="p-5 text-gray-400 focus:outline-none italic rounded-md w-full"
          type="text"
          name="phone"
          placeholder="Phone"
          value={phone}
          readOnly={true}
        />
      </div>
      <div className="relative my-5">
        <textarea
          className="p-5 rounded-md w-full"
          rows={5}
          name="message"
          placeholder="Message..."
        />
      </div>
      <button className="w-full bg-green-500 my-2 text-black text-center px-5 py-5  rounded hover:bg-green-600">
        Send Whatsapp Message
      </button>
    </form>
  );
};

export default WhatsappForm;
