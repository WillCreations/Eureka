import { useState, useContext, useEffect } from "react";
import RecoveryContext from "@/contextProvider/Recovery";
import { useRouter } from "next/navigation";
import * as style from "@/app/Styles/index.module.css";

const Reset = () => {
  const context = useContext(RecoveryContext);
  const { email, setPage } = context;
  const router = useRouter();
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
                error: "input password",
              },
              {
                name: "password2",
                label: "Confirm Password",
                error: "must match password",
              },
            ].map((p) => {
              return (
                <div key={p.name} className="flex flex-col">
                  <label>{p.label}</label>
                  <input
                    className={`py-3 px-2 rounded-md text-white ${style.input}`}
                    type="password"
                    name={p.name}
                    required={true}
                    pattern={p.name === "password2" && value.password}
                    onChange={(e) =>
                      setValue({ ...value, [p.name]: e.target.value })
                    }
                  />
                  <span className="text-red-700 hidden ">{p.error}</span>
                </div>
              );
            })}
          </div>

          <button className="btn btn-outline my-3 w-full">Save</button>
          <span className="text-green-500 align-center">{message}</span>
        </form>
      </div>
    </div>
  );
};

export default Reset;
