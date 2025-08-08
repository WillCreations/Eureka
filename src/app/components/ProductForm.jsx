"use client";
import Uploader from "@/app/components/Uploader";
import ErrorMessage from "@/app/components/ErrorMessage";
import SuccessMessage from "@/app/components/SuccessMessage";
import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsFillCaretDownFill } from "react-icons/bs";
import * as styles from "@/app/Styles/index.module.css";
import * as style from "@/app/Styles/index.module.css";
import Modal from "@/app/components/Modal";
// import { category } from "@/Category";

const ProductForm = ({ Action, button, count, category }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pictureFile, setPictureFile] = useState();
  const [base64, setBase64] = useState("");
  const [details, setDetails] = useState({
    name: "",
    price: 0,
    slug: "",
    stock: 0,
    description: "",
  });

  useEffect(() => {
    setIsLoading(false);
  }, [count]);

  const clear = () => {
    document.body.style.overflow = "auto";
    setSuccess("");
    setError("");
    setDetails({
      name: "",
      price: 0,
      slug: "",
      stock: 0,
      description: "",
    });
  };
  const Netflix = async (formData) => {
    setIsLoading(true);
    setSuccess("");
    setError("");
    setTimeout(async () => {
      try {
        const formData2 = new FormData();
        formData2.append("pictureFile", pictureFile);
        formData2.append("base64", base64);
        const response = await Action(formData, formData2);
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
        console.log("error: ", error.message);
      }

      setTimeout(() => {
        clear();
      }, 10000);
    }, 5000);
  };

  const Drop = () => {
    const dropper = document.querySelector("select span");
    dropper.style.rotate = "90degree";
  };

  const onChangeHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const inputs = [
    {
      name: "name",
      value: details.name,
      placeholder: "Enter Product Name...",
      label: "Name",
      error: "Enter product name ",
      type: "text",
      pattern: `^[a-zA-Z0-9].{2,16}$`,
    },
    {
      name: "slug",
      value: details.slug,
      placeholder: "Enter Product Slug...",
      label: "Slug",
      error: "Enter product slug ",
      type: "text",
      pattern: `^[a-zA-Z0-9].{2,16}$`,
    },
    {
      name: "price",
      value: details.price,
      placeholder: "Enter Price...",
      label: "Price",
      error: "enter valid price ",
      type: "number",
      pattern: `^[0-9].{2,500}$`,
    },
    {
      name: "stock",
      value: details.stock,
      placeholder: "Enter Stock...",
      label: "Stock",
      error: "enter valid stock ",
      type: "number",
      pattern: `^[0-9].{2,500}$`,
    },
  ];
  return (
    <form
      className="grid w-full text-gray-300 grid-cols-2 gap-10 lg:flex-row justify-between my-5 bg-[#121212] py-5 px-5 sm:px-10 rounded-2xl"
      action={Netflix}
    >
      <Uploader
        picture="/productModel.svg"
        setPictureFile={setPictureFile}
        base64={base64}
        setBase64={setBase64}
        imagine="image"
      />

      <div className=" pb-5 w-full col-span-2 lg:col-span-1">
        {inputs.map((one, index) => {
          return (
            <div
              className=" grid grid-cols-6 my-5 items-center gap-1 sm:gap-5 relative h-fit"
              key={index}
            >
              <label className="capitalize col-span-6 sm:col-span-2">
                {one.label}
              </label>
              <div className=" col-span-6 sm:col-span-4">
                <input
                  className={`p-5 bg-black w-full text-gray-300 rounded-md col-span-5 ${style.input}`}
                  type={one.type}
                  name={one.name}
                  value={one.value}
                  placeholder={one.placeholder}
                  onChange={onChangeHandler}
                  pattern={one.pattern}
                />
              </div>
            </div>
          );
        })}

        <div className=" grid grid-cols-6 my-5 items-center gap-1 sm:gap-5 relative h-fit">
          <label className="capitalize col-span-6 sm:col-span-2">
            Category
          </label>
          <select
            id="cars"
            name="category"
            onClick={() => {
              Drop();
            }}
            className={`block bg-black text-gray-400 col-span-6 sm:col-span-4 p-5 w-full relative rounded-md ${styles.drop}`}
          >
            <option value="" className="py-3 font-bold ">
              Choose Product Category
            </option>
            {category.slice(0).map((s, index) => {
              return (
                <option key={index} value={s.category} className="py-3 ">
                  {s.category}
                </option>
              );
            })}

            <span className="absolute text-white top-50 right-0">
              {<BsFillCaretDownFill />}
            </span>
          </select>
        </div>

        <div className=" grid grid-cols-6 my-5 items-center gap-1 sm:gap-5 relative h-fit">
          <label className="capitalize col-span-6 sm:col-span-2">
            Description
          </label>
          <textarea
            className={`p-5 bg-black w-full text-gray-300 rounded-md col-span-6 sm:col-span-4 ${style.input}`}
            rows={5}
            name="description"
            placeholder="Product Description..."
            value={details.description}
            onChange={onChangeHandler}
          />
        </div>

        {error !== "" && (
          <Modal isOpen={isError} setIsOpen={setIsError}>
            <ErrorMessage error={error} />
          </Modal>
        )}

        {success !== "" && (
          <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <SuccessMessage success={success} />
          </Modal>
        )}

        <button className="flex items-center w-full justify-center bg-green-300 my-2 px-10 py-5 text-black  rounded-2xl">
          <div className="flex justify-center items-center">
            {!isLoading ? (
              "Add"
            ) : (
              <AiOutlineLoading3Quarters className=" text-black text-2xl animate-spin" />
            )}
          </div>
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
