"use client";
import React, { useState } from "react";
import Modal from "@/app/components/Modal";
import * as style from "@/app/Styles/index.module.css";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CategoryForm = ({ Action }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValue, setIsValue] = useState("");
  const [message, setMessage] = useState({ error: "", success: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const clear = () => {
    setIsValue("");
    setIsOpen(false);
    setIsError(false);
    setMessage({ error: "", success: "" });
  };

  const Funct = async (formData) => {
    setIsLoading(true);
    setMessage({ error: "", success: "" });
    setIsOpen(false);
    setIsError(false);
    setTimeout(async () => {
      const response = await Action(formData);

      console.log(response.message);
      if (response.ok) {
        setIsOpen(true);
        setMessage({ success: response.message });
        setIsLoading(false);
      } else {
        setIsError(true);
        setMessage({ error: response.message });
        setIsLoading(false);
      }
      setTimeout(() => {
        clear();
      }, 10000);
    }, 3000);
  };
  return (
    <form
      className="col-span-1 grid w-full grid-cols-1  sm:grid-cols-2 lg:grid-cols-1 gap-5   justify-between  bg-[#121212] p-5 sm:p-10 rounded-2xl"
      action={Funct}
    >
      {message.error !== "" && (
        <Modal isOpen={isError} setIsOpen={clear}>
          <ErrorMessage error={message.error} />
        </Modal>
      )}

      {message.success !== "" && (
        <Modal isOpen={isOpen} setIsOpen={clear}>
          <SuccessMessage success={message.success} />
        </Modal>
      )}
      <input
        className={`p-5 bg-black w-full text-gray-400 rounded-2xl col-span-1 ${style.input}`}
        type="text"
        value={isValue}
        onChange={(e) => {
          setIsValue(e.target.value);
        }}
        name="newCategory"
        placeholder="Enter new category..."
      />
      <button
        disabled={isLoading}
        className="cursor-pointer w-full h-full col-span-1 text-center bg-green-300  p-5  text-black  rounded-2xl "
      >
        <div className="flex justify-center items-center">
          {!isLoading ? (
            "Add category"
          ) : (
            <AiOutlineLoading3Quarters className=" font-black text-2xl animate-spin" />
          )}
        </div>
      </button>
    </form>
  );
};

export default CategoryForm;
