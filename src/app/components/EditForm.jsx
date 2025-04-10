"use client";
import * as styles from "@/app/Styles/index.module.css";
import * as style from "@/app/Styles/index.module.css";
import Uploader from "@/app/components/Uploader";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsFillCaretDownFill } from "react-icons/bs";

const EditForm = ({ Updater, Prod }) => {
  const { _id, name, category, stock, price, description, image, slug } = Prod;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [pictureFile, setPictureFile] = useState();
  const [base64, setBase64] = useState("");
  const [details, setDetails] = useState({
    name,
    category,
    price,
    slug,
    stock,
    description,
    image,
  });

  const Netflix = async (formData) => {
    console.log(formData, "onSubmit");
    const formData2 = new FormData();
    formData2.append("pictureFile", pictureFile);
    formData2.append("base64", base64);
    formData2.append("imageUrl", image);
    await Updater(formData, formData2);
  };

  const onChangeHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const inputs = [
    {
      name: "name",
      placeholder: details.name,
      label: "Name",
      error: "Enter product name ",
      type: "text",
      pattern: `^[a-zA-Z0-9].{2,16}$`,
    },
    {
      name: "slug",
      placeholder: details.slug,
      label: "Slug",
      error: "Enter product slug ",
      type: "text",
      pattern: `^[a-zA-Z0-9].{2,16}$`,
    },
    {
      name: "price",
      placeholder: details.price,
      label: "Price",
      error: "enter valid price ",
      type: "number",
      pattern: `^[0-9].{2,500}$`,
    },
    {
      name: "stock",
      placeholder: details.stock,
      label: "Stock",
      error: "enter valid address ",
      type: "number",
      pattern: `^[0-9].{2,500}$`,
    },
  ];

  return (
    <div className=" mx-10 lg:mx-28 ">
      <div className="my-5 flex justify-between  rounded-md  w-4/5 text-xl py-2 ">
        <p className="text-green-300 text-4xl font-bold">Update Product</p>
      </div>

      <form
        className="grid w-full grid-cols-2 gap-10 lg:flex-row justify-between my-5 bg-[#121212] py-5 px-10 rounded-md"
        action={Netflix}
      >
        <Uploader
          picture={image}
          setPictureFile={setPictureFile}
          base64={base64}
          setBase64={setBase64}
          imagine="image"
        />

        <input className="p-5" type="hidden" name="id" value={_id} />

        <div className=" pb-5 w-full col-span-2 lg:col-span-1">
          {inputs.map((one, index) => {
            return (
              <div
                className=" grid grid-cols-6 my-5 items-center gap-5 relative h-fit"
                key={index}
              >
                <label className="capitalize col-span-2">{one.label}</label>
                <div className=" col-span-4">
                  <input
                    className={`p-5 bg-black w-full text-gray-400 rounded-md col-span-5 ${style.input}`}
                    type={one.type}
                    name={one.name}
                    value={one.placeholder}
                    placeholder={one.placeholder}
                    onChange={onChangeHandler}
                    pattern={one.pattern}
                  />
                </div>
              </div>
            );
          })}

          <div className=" grid grid-cols-6 my-5 items-center gap-5 relative h-fit">
            <label className="capitalize col-span-2">Category</label>
            <select
              onChange={onChangeHandler}
              id="cars"
              name="category"
              onClick={() => {
                Drop();
              }}
              className={`block bg-black text-gray-400 col-span-4 p-5 w-full relative rounded-md ${styles.drop}`}
            >
              <option value={details.category} className="py-3 font-bold ">
                {details.category}
              </option>
              {["Clothing", "Electronics", "Beauty", "Phone", "Kitchen"].map(
                (selectItem) => {
                  return (
                    <option
                      key={selectItem}
                      value={selectItem}
                      className="py-3 "
                    >
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

          <div className=" grid grid-cols-6 my-5 items-center gap-5 relative h-fit">
            <label className="capitalize col-span-2">Description</label>
            <textarea
              className={`p-5 bg-black w-full text-gray-400 rounded-md col-span-4 ${style.input}`}
              rows={5}
              name="description"
              placeholder="Product Description..."
              value={details.description}
              onChange={onChangeHandler}
            />
          </div>

          <div>{error}</div>
          <button className="flex items-center w-full justify-center bg-green-300 my-2 px-10 py-5 text-black  rounded hover:bg-green-600">
            {isLoading && (
              <div className="mr-2 animate-spin">
                <AiOutlineLoading3Quarters />
              </div>
            )}
            <h1>Update</h1>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
