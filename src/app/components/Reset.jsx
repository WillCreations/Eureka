import { useState, useContext, useEffect } from "react";
import RecoveryContext from "@/contextProvider/Recovery";
import { useRouter } from "next/navigation";
import * as style from "@/app/Styles/index.module.css";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Reset = () => {
  const [state, setState] = useState(<MdVisibility />);
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
      setMessage("Reset Successful");
      setTimeout(() => {
        setPage("Login");
      }, 3000);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white w-1/2 p-5 text-black rounded-md">
        <h1 className="text-2xl text-center font-extrabold my-3">Reset</h1>

        <form onSubmit={HandleSubmit}>
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
                  <div className="flex flex-col relative">
                    <input
                      className={`py-3 px-5 rounded-md relative text-white ${style.input}`}
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
                      className="absolute right-0 top-0 bottom-0  flex items-center"
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
                      <span className=" mx-5 p-2 rounded-full text-white hover:bg-gray-800">
                        {!show[p.name] ? <MdVisibility /> : <MdVisibilityOff />}
                      </span>
                    </div>
                    <span className="text-red-700 hidden ">{p.error}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="hover:bg-green-500 hover:text-white transition-all ease py-3 border-2 border-solid border-green-500 rounded-xl my-3 w-full">
            Save
          </button>
          <span className="text-green-500 align-center">{message}</span>
        </form>
      </div>
    </div>
  );
};

export default Reset;
