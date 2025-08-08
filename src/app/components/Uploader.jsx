"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  FaClipboardList,
  FaEllipsis,
  FaTrashCan,
  FaUpload,
} from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaEllipsisV, FaExchangeAlt } from "react-icons/fa";
import DeleteImage from "@/app/components/DeleteImage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Uploader = ({
  imagine,
  picture,
  setPictureFile,
  base64,
  setBase64,
  DeleteObj,
}) => {
  const [show, setShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const UploadRef = useRef(null);
  const toolTipRef = useRef(null);
  useEffect(() => {
    setShow(false);
  }, [base64]);

  useEffect(() => {
    const closer = (e) => {
      if (toolTipRef.current && !toolTipRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", closer);
    return () => {
      document.removeEventListener("mousedown", closer);
    };
  }, []);
  useEffect(() => {
    const closer = (e) => {
      if (UploadRef.current && !UploadRef.current.contains(e.target)) {
        setIsLoading(false);
      }
    };
    document.addEventListener("mousedown", closer);
    return () => {
      document.removeEventListener("mousedown", closer);
    };
  }, []);
  const Loader = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    console.log({ checkFile1: file });
    setPictureFile(file);
    const reader = new FileReader();
    console.log(reader);
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setIsLoading(false);
      console.log(reader.result, "result");
      setBase64(reader.result);
    };
  };

  return (
    <div className=" relative cursor-pointer w-full col-span-2 lg:col-span-1 my-3 mr-10">
      <div className=" relative rounded-2xl overflow-hidden w-full max-h-[650px]">
        <Image
          src={base64 ? base64 : picture}
          className="w-full min-h-full"
          style={{ objectFit: "cover" }}
          alt="image"
          width={1000}
          height={1000}
        />

        {show ? (
          <div
            ref={toolTipRef}
            className=" bg-[#121212] text-green-300p-5 p-3 rounded-lg absolute z-[11] top-3 right-[92px] sm:top-5 md:top-[120px] sm:right-5 md:right-10   opacity-1 flex flex-col gap-1 w-[200px] my-2 "
          >
            {base64 ? (
              <div
                onClick={() => {
                  setBase64("");
                }}
                className="grid grid-cols-5 gap-2 items-center bg-black rounded-md p-2"
              >
                <div className="col-span-1">
                  <IoClose />
                </div>
                <div className="col-span-4 p-1 rounded-lg">Remove Upload</div>
              </div>
            ) : (
              <div className="grid grid-cols-5 relative  overflow-hidden  gap-2 items-center bg-black rounded-md p-2">
                <div className="col-span-1">
                  {!isLoading ? (
                    <FaUpload />
                  ) : (
                    <AiOutlineLoading3Quarters className="  animate-spin" />
                  )}
                </div>

                <div className="col-span-4 p-1 rounded-lg">
                  {!isLoading ? "Upload Image" : "Uploading..."}
                </div>
                <input
                  ref={UploadRef}
                  className="absolute top-0 bottom-0 right-0 left-0 rounded-lg cursor-pointer   opacity-0 bg-white col-span-4"
                  type="file"
                  accept="image/*"
                  name={imagine}
                  onChange={(e) => {
                    Loader(e);
                  }}
                  onClick={(e) => {
                    console.log(window);
                    setTimeout(() => {
                      console.log(e.target.value);
                      if (!e.target.value) {
                        setIsLoading(false);
                      }
                    }, 5000);

                    setIsLoading(true);
                  }}
                />
              </div>
            )}
            {!base64 &&
              picture !== "/personHead.svg" &&
              picture !== "/productModel.svg" && (
                <DeleteImage {...DeleteObj} setShow={setShow} />
              )}
          </div>
        ) : null}

        <div
          onClick={() => {
            setShow(!show);
          }}
          className="bg-[#121212] text-green-300 p-5 rounded-2xl cursor-pointer  absolute z-[10] top-3 right-3 sm:top-5 md:top-10 sm:right-5 md:right-10 text-4xl w-20 h-20"
        >
          <FaEllipsisV />
        </div>
      </div>
    </div>
  );
};

export default Uploader;
