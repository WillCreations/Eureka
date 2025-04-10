import React from "react";
import { fetchClient } from "@/app/(Engine)/actions/fetchClient";
import { readClient } from "@/app/(Engine)/actions/readClient";
import Mail from "@/app/components/Mail";

const page = async () => {
  const { clients } = await fetchClient();
  console.log({ clients });
  return (
    <div className="min-h-screen text-white py-20">
      <div className=" mx-10 lg:mx-28">
        <h1 className=" text-2xl font-extrabold text-green-500 flex-1">
          Inbox
        </h1>
        {clients?.map((cli, index) => {
          return <Mail key={index} cli={cli} Action={readClient} />;
        })}
      </div>
    </div>
  );
};

export default page;
