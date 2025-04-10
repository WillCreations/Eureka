import React from "react";

const EmailForm = ({ email, Action, roletag }) => {
  const Wrapper = async (formData) => {
    "use server";
    Action(formData);
  };

  return (
    <form className="my-5 pb-5 col-span-2 lg:col-span-1" action={Wrapper}>
      <div className="relative my-5">
        <input
          className="p-5 text-gray-400 focus:outline-none italic rounded-md w-full"
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          readOnly={true}
        />
      </div>
      <div className="relative my-5">
        <input
          className="p-5  rounded-md w-full"
          type="text"
          name="subject"
          placeholder="Subject"
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
        {roletag}
      </button>
    </form>
  );
};

export default EmailForm;
