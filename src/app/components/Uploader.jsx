"use client";
import { useState } from "react";
import Image from "next/image";
import { FaClipboardList } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const Uploader = ({ imagine, picture, setPictureFile, base64, setBase64 }) => {
  const [show, setShow] = useState(false);

  const Shower = () => {
    setBase64("");
    setShow(false);
  };

  const Loader = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    console.log({ checkFile1: file });
    setPictureFile(file);
    const reader = new FileReader();
    console.log(reader);
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result, "result");
      setBase64(reader.result);
    };
    setShow(true);
  };

  return (
    <div className=" relative cursor-pointer w-full col-span-2 lg:col-span-1 my-3 mr-10">
      <div className=" flex relative justify-center items-center rounded-md overflow-hidden w-full">
        <Image
          src={base64 ? base64 : picture}
          style={{ objectFit: "contain" }}
          alt="image"
          width={1000}
          height={1000}
        />

        {!show ? (
          <input
            className="p-5 rounded-lg cursor-pointer absolute z-[11] top-10 right-10  opacity-0 bg-white w-20 h-20"
            type="file"
            accept="image/*"
            name={imagine}
            onChange={(e) => {
              Loader(e);
            }}
          />
        ) : null}

        <div
          onClick={() => {
            Shower();
          }}
          className="bg-[#121212] text-green-300 p-5 rounded-lg cursor-pointer  absolute z-[10] top-10 right-10 text-4xl w-20 h-20"
        >
          {show ? <IoClose /> : <FaClipboardList />}
        </div>
      </div>
    </div>
  );
};

export default Uploader;
