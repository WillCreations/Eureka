import React from "react";

const ClientForm = ({ Action }) => {
  const Wrapper = async (formData) => {
    "use server";
    Action(formData);
  };

  return (
    <form className="my-5 pb-5 col-span-2 lg:col-span-1" action={Wrapper}>
      {["name", "email", "phone", "message"].map((one) => {
        return (
          <div key={one} className="relative my-5">
            {one !== "message" && (
              <input
                className="p-5  rounded-md w-full"
                type="text"
                name={one}
                placeholder={one}
              />
            )}

            {one === "message" && (
              <textarea
                className="p-5 rounded-md w-full"
                rows={5}
                name={one}
                placeholder={one}
              />
            )}
          </div>
        );
      })}

      <button className="w-full bg-green-500 my-2 text-black text-center px-5 py-2  rounded hover:bg-green-600">
        Send
      </button>
    </form>
  );
};

export default ClientForm;
