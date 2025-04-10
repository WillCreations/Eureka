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
      <ul className="bg-[#121212] rounded-xl p-2">
        <li>
          <button
            className=" text-white w-full rounded-xl p-5 my-3"
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
                  className="bg-black w-full rounded-xl p-5 my-2"
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
