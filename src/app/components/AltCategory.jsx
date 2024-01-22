import { useState } from "react";

const AltCategory = ({ FetchFilter, Fetcher }) => {
  const [category, setCategory] = useState("All");
  const [show, setShow] = useState(false);

  const Open = (cate) => {
    setCategory(cate);
    FetchFilter(cate);
    setShow(false);
  };

  const Default = () => {
    setCategory("All");
    Fetcher();
    setShow(false);
  };

  return (
    <div className="mb-10">
      <ul>
        <li>
          <button
            className="w-full btn btn-ghost my-10"
            onClick={() => {
              show ? setShow(false) : setShow(true);
            }}
          >
            {category}
          </button>
        </li>
        {show
          ? [
              "All",
              "Kitchen",
              "Beauty",
              "Clothing",
              "Phone",
              "Electronics",
            ].map((cat) => (
              <li key={cat}>
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    cat !== "All" ? Open(cat) : Default();
                  }}
                >
                  {cat}
                </button>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default AltCategory;
