import React from "react";
import { Codes } from "@/CountryCodes";

const ClientForm = ({ Action }) => {
  console.log({ Codes });
  const Wrapper = async (formData) => {
    await Action(formData);
  };

  return (
    <form className="my-5 pb-5 col-span-2 lg:col-span-1" action={Wrapper}>
      <div className="relative gap-3 my-5 grid grid-cols-6">
        <input
          className="p-5 col-span-3  rounded-md w-full"
          type="text"
          name="firstName"
          placeholder="First Name"
        />
        <input
          className="p-5 col-span-3  rounded-md w-full"
          type="text"
          name="lastName"
          placeholder="Last Name"
        />
      </div>
      <div className="relative my-5">
        <input
          className="p-5  rounded-md w-full"
          type="text"
          name="email"
          placeholder="Email"
        />
      </div>

      <div className="relative my-5 grid gap-3 grid-cols-6 w-full">
        <select
          className="p-5 col-span-2 text-gray-400  block rounded-md"
          name="code"
        >
          <option value="">Country Code</option>;
          {Codes?.map((opt, index) => {
            return (
              <option
                key={index}
                value={opt?.dial_code}
              >{`${opt?.name} : ${opt?.dial_code}`}</option>
            );
          })}
        </select>

        <input
          className="p-5 col-span-4 rounded-md"
          type="text"
          name="phone"
          placeholder="Phone"
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

      <button className="w-full bg-green-300 my-2 text-black text-center px-5 py-5  rounded-md hover:bg-green-600">
        Send
      </button>
    </form>
  );
};

export default ClientForm;
