import React from "react";

const Category = ({ FetchFilter, Fetcher }) => {
  return (
    <div>
      <ul className="flex justify-around py-10 px-10">
        <li>
          <button
            className="btn btn-ghost"
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
                className="btn btn-ghost"
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
