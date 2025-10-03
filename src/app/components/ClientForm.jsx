"use client";
import React, { useState, useRef } from "react";
import { Codes } from "@/CountryCodes";
import Modal from "@/app/components/Modal";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ClientForm = ({ Action }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ error: "", success: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const formRef = useRef(null);

  const clear = () => {
    setModalOpen(false);
    setIsError(false);
    setMessage({ error: "", success: "" });
    if (formRef.current) formRef.current.reset();
  };

  const Wrapper = async (formData) => {
    setIsLoading(true);
    setMessage({ error: "", success: "" });
    setModalOpen(false);
    setIsError(false);

    try {
      const response = await Action(formData);
      if (response.ok) {
        setMessage({ success: response.message, error: "" });
        setIsError(false);
      } else {
        setMessage({ error: response.message, success: "" });
        setIsError(true);
      }
      setModalOpen(true);
    } catch (err) {
      setMessage({ error: "An unexpected error occurred.", success: "" });
      setIsError(true);
      setModalOpen(true);
    } finally {
      setIsLoading(false);
      setTimeout(clear, 10000);
    }
  };

  return (
    <form
      ref={formRef}
      className="my-5 pb-5 col-span-2 lg:col-span-1"
      action={Wrapper}
    >
      {(message.error || message.success) && (
        <Modal isOpen={modalOpen} setIsOpen={clear}>
          {isError ? (
            <ErrorMessage error={message.error} />
          ) : (
            <SuccessMessage success={message.success} />
          )}
        </Modal>
      )}
      <div className="relative gap-3 my-5 grid grid-cols-6">
        <input
          className="p-5 col-span-6 md:col-span-3 bg-[#121212] text-gray-400 rounded-md w-full"
          type="text"
          name="firstName"
          placeholder="First Name"
        />
        <input
          className="p-5 col-span-6 md:col-span-3 bg-[#121212] text-gray-400 rounded-md w-full"
          type="text"
          name="lastName"
          placeholder="Last Name"
        />
      </div>
      <div className="relative my-5">
        <input
          className="p-5 bg-[#121212] text-gray-400 rounded-md w-full"
          type="text"
          name="email"
          placeholder="Email"
        />
      </div>

      <div className="relative my-5 grid gap-3 grid-cols-6 w-full">
        <select
          className="p-5 col-span-6 md:col-span-2 text-gray-400 bg-[#121212] block rounded-md"
          name="code"
        >
          <option value="">Country Code</option>
          {Codes?.map((opt, index) => (
            <option key={index} value={opt?.dial_code}>
              {`${opt?.name} : ${opt?.dial_code}`}
            </option>
          ))}
        </select>

        <input
          className="p-5 col-span-6 md:col-span-4 text-gray-400 bg-[#121212] rounded-md"
          type="text"
          name="phone"
          placeholder="Phone"
        />
      </div>

      <div className="relative my-5">
        <textarea
          className="p-5 text-gray-400 bg-[#121212] rounded-md w-full"
          rows={5}
          name="message"
          placeholder="Message..."
        />
      </div>

      <button
        disabled={isLoading}
        className="cursor-pointer w-full col-span-1 text-center bg-green-300 p-5 text-black rounded-2xl"
      >
        <div className="flex justify-center items-center">
          {!isLoading ? (
            "Send Message"
          ) : (
            <AiOutlineLoading3Quarters className="font-black text-2xl animate-spin" />
          )}
        </div>
      </button>
    </form>
  );
};

export default ClientForm;
