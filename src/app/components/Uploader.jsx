"use client";
import { useState } from "react";
import Image from "next/image";

const Uploader = ({ imagine }) => {
  const [base64, setBase64] = useState();

  const Loader = (e) => {
    e.preventDefault();
    console.log("hey");
    const reader = new FileReader();
    console.log(reader);
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result, "result");
      setBase64(reader.result);
    };
  };

  return (
    <div className="my-5 ">
      <input name="base64" type="hidden" value={base64} />
      <label>Image</label>
      <div className="mb-5 flex rounded-md justify-between items-center text-black bg-white py-1 px-4">
        <input
          className="py-5 w-1/2"
          type="file"
          accept="image/*"
          name={imagine}
          onChange={(e) => {
            Loader(e);
          }}
        />
        {base64 === "" || base64 === undefined ? (
          ""
        ) : (
          <div className="overflow-hidden h-14 w-14 rounded-md shadow-xl">
            <Image
              alt=""
              width={100}
              height={100}
              src={base64}
              objectFit="cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploader;
