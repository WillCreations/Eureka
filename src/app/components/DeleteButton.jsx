"use client";
import React, { useState } from "react";
import Modal from "@/app/components/Modal";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import ConfirmComp from "./ConfirmComp";
import { FaTrashCan } from "react-icons/fa6";

const DeleteButton = ({ cate, Action }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const clear = () => {
    setTimeout(() => {
      setIsOpen(false);
      setIsError(false);
      setMessage("");
    }, 5000);
  };
  const Delete = async () => {
    const response = await Action(cate._id);
    if (response.ok) {
      setMessage(`${cate.category} category ${response.message}`);
    } else {
      setIsError(true);
      setMessage(response.message);
    }
    return clear();
  };
  return (
    <div className="  flex items-center">
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {message === "" ? (
          <ConfirmComp
            item={`delete ${cate.category}`}
            setConfirm={setIsOpen}
            Action={Delete}
          />
        ) : message !== "" && isError ? (
          <ErrorMessage error={message} />
        ) : (
          <SuccessMessage success={message} />
        )}
      </Modal>
      <div
        onClick={() => {
          setIsOpen(true);
          document.body.style.overflow = "hidden";
          console.log(isOpen, "opening modal...");
        }}
        className=" cursor-pointer border-solid border-2 transition-all border-black rounded-lg px-2 py-1 flex items-center p-0 m-0 font-bold text-md text-black hover:bg-[#121212] hover:text-green-300 "
      >
        <FaTrashCan />
      </div>
    </div>
  );
};

export default DeleteButton;
