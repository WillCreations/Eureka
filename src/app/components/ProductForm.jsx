"use client";
import Uploader from "@/app/components/Uploader";
import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsFillCaretDownFill } from "react-icons/bs";
import * as styles from "@/app/Styles/index.module.css";

const ProductForm = ({ Action, button, count }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(false);
  }, [count]);

  const Netflix = async (formData) => {
    try {
      Action(formData);
    } catch (error) {
      setIsLoading(false);
      // setError(error.message);
      console.log("error: ", error);
    }
  };

  const Drop = () => {
    const dropper = document.querySelector("select span");
    dropper.style.rotate = "90degree";
  };

  return (
    <form className="my-5 pb-5" action={Netflix}>
      {["name", "description", "price", "slug"].map((one) => {
        return (
          <div className="my-5 " key={one}>
            <label className="capitalize">{one}</label>
            <input
              className="p-5 w-full rounded-md"
              type="text"
              name={one}
              placeholder={one}
            />
          </div>
        );
      })}
      <div className="relative">
        <label>Category</label>
        <select
          id="cars"
          name="category"
          onClick={() => {
            Drop();
          }}
          className={`block p-5 w-full relative rounded-md ${styles.drop}`}
        >
          <option className="py-3 font-bold ">--select--</option>
          {["Clothing", "Electronics", "Beauty", "Phone", "Kitchen"].map(
            (selectItem) => {
              return (
                <option key={selectItem} value={selectItem} className="py-3 ">
                  {selectItem}
                </option>
              );
            }
          )}
          <span className="absolute text-white top-50 right-0">
            {<BsFillCaretDownFill />}
          </span>
        </select>
      </div>

      <Uploader imagine="image" />
      <button className="flex items-center float-right bg-green-500 my-2 text-white px-10 py-3 ml-4 rounded hover:bg-green-600">
        {isLoading && (
          <div className="mr-2 animate-spin">
            <AiOutlineLoading3Quarters />{" "}
          </div>
        )}
        {button}
      </button>
      {/* <div>{error}</div> */}
    </form>
  );
};

export default ProductForm;
