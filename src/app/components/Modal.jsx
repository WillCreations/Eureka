import React from "react";

const Modal = ({ isOpen, setIsOpen, children }) => {
  const shorten = (text) => {
    console.log("text: ", text);
    const s = String(text);
    return `${s.slice(0, 4)}%`;
  };

  return (
    <div>
      <div
        className={`fixed ${
          isOpen ? "flex" : "hidden"
        } justify-center items-center top-0 bottom-0 left-0 right-0   z-50 `}
      >
        <div
          onClick={() => {
            setIsOpen(false);
            document.body.style.overflow = "auto";
          }}
          className={`absolute  ${
            isOpen ? "block" : "hidden"
          }  top-0 left-0 bg-black right-0 bottom-0 z-[100] opacity-50`}
        ></div>
        <div className="absolute w-[90%] lg:w-[50vw] h-[50vh] lg:h-[60vh] z-[101]">
          <div className="bg-[#121212] flex justify-center items-center relative overflow-hidden rounded-3xl w-full h-full">
            <div
              onClick={() => {
                setIsOpen(false);
                document.body.style.overflow = "auto";
              }}
              className="absolute cursor-pointer top-2 right-2 font-bold px-10 py-2 bg-black rounded-2xl text-green-300"
            >
              X
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
