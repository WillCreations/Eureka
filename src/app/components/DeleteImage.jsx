"use client";
import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import Modal from "./Modal";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const DeleteImage = ({
  id,
  fsUnlink,
  cloudDestroy,
  itemType,
  Action,
  setShow,
}) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const clear = () => {
    document.body.style.overflow = "auto";
    setSuccess("");
    setError("");
    setIsOpen(false);
    setIsError(false);
    setShow(false);
  };
  const HandeleDelete = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await Action({
          id,
          fsUnlink,
          cloudDestroy,
          itemType,
        });

        if (response.ok) {
          setIsLoading(false);
          setSuccess(response.message);
          setIsOpen(true);
          document.body.style.overflow = "hidden";
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        setError(error.message);
        document.body.style.overflow = "hidden";
      }
      setTimeout(() => {
        clear();
      }, 10000);
    }, 5000);
  };
  return (
    <div
      disabled={isLoading}
      onClick={() => {
        HandeleDelete();
      }}
      className="grid grid-cols-5 gap-2 items-center bg-black rounded-md p-2"
    >
      <div className="col-span-1">
        {!isLoading ? (
          <FaTrashCan />
        ) : (
          <AiOutlineLoading3Quarters className="  animate-spin" />
        )}
      </div>
      <div className="col-span-4 p-1 rounded-lg">
        {" "}
        {!isLoading ? "Delete Image" : "Deleting..."}
      </div>
      {success && (
        <Modal setIsOpen={clear} isOpen={isOpen}>
          <SuccessMessage success={success} />{" "}
        </Modal>
      )}
      {error && (
        <Modal setIsOpen={clear} isOpen={isError}>
          <ErrorMessage error={error} />{" "}
        </Modal>
      )}
    </div>
  );
};

export default DeleteImage;
