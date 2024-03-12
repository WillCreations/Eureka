"use client";

import Uploader from "@/app/components/Uploader";
import { useState } from "react";
import Image from "next/image";
import * as styles from "@/app/Styles/index.module.css";

const EditForm = ({ Updater, Parameter, Prod, url }) => {
  const { name, category, price, description, image, slug } = Prod;

  const Netflix = async (formData) => {
    console.log(formData, "onSubmit");

    Updater(formData);
  };

  return (
    <div className="flex flex-col w-full items-center justify-start">
      <div className="my-5 flex justify-between  rounded-md  w-4/5 text-xl py-2 bg-gray-800 text-white px-10">
        <p className="text-white">Update Product</p>
      </div>

      <div className="flex flex-col lg:flex-row justify-between my-5 bg-gray-900 py-5 px-10 mx-10 md:w-4/5 rounded-md">
        <div className="w-1/2 my-3 mr-10">
          <div className="mt-5 mr-14 rounded-md overflow-hidden w-full">
            <Image src={image} alt={description} width={400} height={400} />
          </div>
        </div>
        <form className=" pb-5 w-full" action={Netflix}>
          <div className="my-5 w-full">
            <input className="p-5" type="hidden" name="id" value={Parameter} />
          </div>
          <div className="my-5 w-full">
            <input className="p-5" type="hidden" name="url" value={url} />
          </div>
          {[
            { name: "name", place: name },
            { name: "description", place: description },
            { name: "price", place: price },
            { name: "slug", place: slug },
          ].map((one) => {
            return (
              <div key={one.name} className="mb-3">
                <label className="capitalize">{one.name}</label>
                <input
                  className="p-5 w-full rounded-md"
                  type="text"
                  name={one.name}
                  placeholder={one.place}
                />
              </div>
            );
          })}

          <div className="relative">
            <label>Category</label>
            <select
              id="cars"
              name="category"
              className={`block p-5 w-full relative rounded-md ${styles.drop}`}
            >
              <option className="py-3 text-gray-600 font-bold ">
                --select--
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
            </select>
          </div>

          <Uploader imagine="image" />
          <button className="float-right bg-green-500 my-2 text-white px-4 py-2 ml-4 rounded hover:bg-green-600">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
