"use client";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Modal from "@/app/components/Modal";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import ConfirmComp from "./ConfirmComp";
import { FaTrashCan } from "react-icons/fa6";

const DeleteForm = ({ item, Action }) => {
  const [form, setForm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState({ error: "", success: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const clear = () => {
    setIsOpen(false);
    setIsError(false);
    setMessage({ error: "", success: "" });
  };

  const deleteItem = async () => {
    setConfirm(false);
    setIsLoading(true);
    setMessage({ error: "", success: "" });
    setIsOpen(false);
    setIsError(false);
    setTimeout(async () => {
      const response = await Action(form);
      if (response.ok) {
        setIsOpen(true);
        setMessage({ success: `${item.name} ${response.message}` });
        setIsLoading(false);
      } else {
        setIsError(true);
        setMessage({ error: response.message });
        setIsLoading(false);
      }
    }, 5000);
    setTimeout(() => {
      clear();
    }, 10000);
  };

  const ConfirmAction = (formData) => {
    setForm(formData);
    setConfirm(true);
  };

  return (
    <form
      className="flex items-center col-span-3 lg:col-span-1"
      action={ConfirmAction}
    >
      {confirm && (
        <Modal isOpen={confirm} setIsOpen={setConfirm}>
          <ConfirmComp
            item={`delete ${item.name}`}
            setConfirm={setConfirm}
            Action={deleteItem}
          />
        </Modal>
      )}
      {message.error !== "" && (
        <Modal isOpen={isError} setIsOpen={setIsError}>
          <ErrorMessage error={message.error} />
        </Modal>
      )}

      {message.success !== "" && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <SuccessMessage success={message.success} />
        </Modal>
      )}

      <input type="hidden" name="cloudDestroy" value={item?.destroy} />
      <input type="hidden" name="fsUnlink" value={item.image} />
      <input type="hidden" name="id" value={item._id.toString()} />
      <button className="rounded-lg bg-[#121212] w-full xxs:px-5 py-3 font-bold text-gray-300 ">
        <div className="flex justify-center items-center">
          {!isLoading ? (
            <div className="flex items-center">
              <FaTrashCan className="text-green-300" />{" "}
              <span className="mx-2">Delete</span>
            </div>
          ) : (
            <AiOutlineLoading3Quarters className=" text-green-300 text-2xl animate-spin" />
          )}
        </div>
      </button>
    </form>
  );
};

export default DeleteForm;
