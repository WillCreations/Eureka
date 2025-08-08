"use client";
import { useState, useContext, useEffect } from "react";
import RecoveryContext from "@/contextProvider/Recovery";
import { useRouter } from "next/navigation";
import * as style from "@/app/Styles/index.module.css";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import SubHeader from "./SubHeader";
import Modal from "@/app/components/Modal";
import SuccessMessage from "@/app/components/SuccessMessage";
import ErrorMessage from "@/app/components/ErrorMessage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Reset = () => {
  const [state, setState] = useState(<MdVisibility />);
  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();

  const [show, setShow] = useState({
    password: false,
    password2: false,
  });
  const [pass, setPass] = useState({
    password: "password",
    password2: "password",
  });
  const context = useContext(RecoveryContext);
  const { email, setPage } = context;
  const router = useRouter();
  const [focused, setFocused] = useState({
    focus1: "false",
    focus2: "false",
  });
  const [message, setMessage] = useState("");
  const [value, setValue] = useState({
    id: "",
    password: "",
    password2: "",
  });

  useEffect(() => {
    const Changer = async () => {
      console.log(email, "current email");
      const response = await fetch(`/api/recovery/reset?search=${email}`);
      const data = await response.json();
      console.log(data, "user iddd");
      setValue({ ...value, id: data._id });
    };

    Changer();
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("/api/recovery/reset", {
        method: "POST",
        header: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ ...value }),
      });
      const data = await response.json();
      console.log(response, "response.ok");
      if (response.ok) {
        setSuccess(data.message);
        setIsOpen(true);
        setTimeout(() => {
          setPage("Login");
          setSuccess("");
        }, 3000);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      setIsError(true);
    }
  };

  return (
    <div className="w-full px-5 xxs:px-10 lg:px-28  ">
      <SubHeader tag="Reset" />
      <div className="w-full flex  justify-center">
        <form
          className="bg-[#121212] w-full md:w-2/4 lg:w-2/5 p-5 text-green-300 rounded-2xl"
          onSubmit={HandleSubmit}
        >
          <div>
            {[
              {
                name: "password",
                label: "New Password",
                error:
                  "password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one special character !@#$%^&* and one digit",
                f: "focus1",
                focus: focused.focus1,
                type: pass.password,
                pattern: `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*].{8,20}$`,
              },
              {
                name: "password2",
                label: "Confirm Password",
                error: "Passwords don't match ",
                f: "focus2",
                focus: focused.focus2,
                type: pass.password2,
                pattern: value.password,
              },
            ].map((p) => {
              return (
                <div key={p.name} className="flex flex-col mt-2">
                  <label>{p.label}</label>
                  <div className="flex flex-col relative ">
                    <input
                      className={`py-5 px-5 bg-black rounded-2xl  text-white ${style.input}`}
                      type={p.type}
                      name={p.name}
                      required={true}
                      pattern={p.pattern}
                      onChange={(e) =>
                        setValue({ ...value, [p.name]: e.target.value })
                      }
                      onBlur={(e) => {
                        setFocused({ ...focused, [p.f]: "true" });
                      }}
                      focused={p.focus}
                    />
                    <div
                      className="absolute right-0 top-[20%] flex items-center"
                      onClick={(e) => {
                        if (!show[p.name]) {
                          setShow({ ...show, [p.name]: true });
                          setPass({ ...pass, [p.name]: "text" });
                        } else {
                          setShow({ ...show, [p.name]: false });
                          setPass({ ...pass, [p.name]: "password" });
                        }
                      }}
                    >
                      <span className=" mx-5 p-2 rounded-full text-white hover:bg-[#121212]">
                        {!show[p.name] ? <MdVisibility /> : <MdVisibilityOff />}
                      </span>
                    </div>
                    <span className="text-red-500 border-2 my-2 border-red-500 border-solid py-2 px-5 bg-red-300 rounded-md hidden ">
                      {p.error}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="bg-green-300 text-black py-5  rounded-xl my-3 w-full">
            <div className="flex justify-center items-center">
              {!isLoading ? (
                "Save"
              ) : (
                <AiOutlineLoading3Quarters className=" font-black text-2xl animate-spin" />
              )}
            </div>
          </button>
          {success ? (
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
              <SuccessMessage success={success} />
            </Modal>
          ) : null}
          {error ? (
            <Modal isOpen={isError} setIsOpen={setIsError}>
              <ErrorMessage error={error} />
            </Modal>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Reset;
