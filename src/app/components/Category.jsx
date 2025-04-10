import React from "react";

const Category = ({ FetchFilter, Fetcher, cateSearch }) => {
  return (
    <div>
      <ul className="flex justify-between py-10 ">
        <li className="text-center">
          <button
            className={`${
              cateSearch === ""
                ? "bg-green-300 text-black"
                : "bg-[#121212] text-white"
            } w-full rounded-xl p-5 my-2`}
            onClick={() => {
              Fetcher();
            }}
          >
            All
          </button>
        </li>

        {["Kitchen", "Beauty", "Clothing", "Phone", "Electronics"].map(
          (cat) => (
            <li key={cat}>
              <button
                className={`${
                  cateSearch === cat
                    ? "bg-green-300 text-black"
                    : "bg-[#121212] text-white"
                } w-full rounded-xl p-5 my-2`}
                onClick={() => {
                  FetchFilter(cat);
                }}
              >
                {cat}
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Category;
