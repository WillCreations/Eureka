"use client";
import Uploader from "@/app/components/Uploader";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";

const UserEdit = ({ Updater, parameter, Use }) => {
  const [base, setBase] = useState("");
  const [show, setShow] = useState(false);
  const [pass, setPass] = useState("password");
  const [error, setError] = useState("");
  const { name, email, address, phone, picture } = Use;

  const Loader = (e) => {
    e.preventDefault();
    console.log("hey");
    const reader = new FileReader();
    console.log(reader);
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result, "result");
      setBase(reader.result);
    };
  };

  const Netflix = async (formData) => {
    try {
      console.log(formData, "onSubmit");
      const { id, username, email, address, phone, password } =
        Object.fromEntries(formData);

      console.log(base, "base10 kor");

      const form = {
        id,
        username,
        email,
        address,
        phone,
        picture: base,
        password,
      };

      const response = await Updater(form);
      if (response) {
        console.log(response);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const shower = (e) => {
    e.preventDefault();
    if (!show) {
      setShow(true);
      setPass("text");
    } else {
      setShow(false);
      setPass("password");
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-start">
      <div className="my-5 flex justify-between rounded-md text-xl py-2 w-4/5 bg-gray-800 text-white px-10">
        <p className="text-white">Update Profile</p>
      </div>
      <div className="flex flex-col lg:flex-row justify-between my-5 bg-gray-900 py-5 px-10 mx-10 md:w-4/5 rounded-md">
        <div className="w-1/2 my-3 mr-10">
          <div className="mt-5 mr-14 rounded-md overflow-hidden w-full">
            <Image src={picture} alt={name} width={100} height={100} />
          </div>
        </div>
        <form className=" pb-5 w-full" action={Netflix}>
          <div className="my-5 w-full">
            <input className="p-5" type="hidden" name="id" value={parameter} />
          </div>
          {[
            { name: "username", place: name },
            { name: "email", place: email },
            { name: "address", place: address },
            { name: "phone", place: phone },
            { name: "password", place: "password" },
          ].map((one) => {
            return (
              <div key={one.name} className="my-5 relative">
                <label className="capitalize">{one.name}</label>
                <input
                  className="p-5 w-full rounded-md"
                  type={one.place === "password" ? `${pass}` : "text"}
                  name={one.name}
                  placeholder={one.place}
                />

                {one.name === "password" && (
                  <div
                    className="absolute right-0 top-1/2 mx-5 p-2 rounded-full hover:bg-gray-800"
                    onClick={(e) => {
                      shower(e);
                    }}
                  >
                    {!show ? <MdVisibility /> : <MdVisibilityOff />}
                  </div>
                )}
              </div>
            );
          })}
          <div>{error}</div>
          <Uploader imagine="picture" Upload={Loader} image={base} />

          <button className="float-right bg-green-500 my-2 text-white px-4 py-2 ml-4 rounded hover:bg-green-600">
            update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
