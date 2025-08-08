import { useState } from "react";
// import { category } from "@/Category";

const AltCategory = ({ FetchFilter, Fetcher, catego }) => {
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
      <ul
        className={`${
          show ? "bg-[#121212] transition-all" : "bg-green-300 transition-all"
        } rounded-xl p-2`}
      >
        <li>
          <button
            className={`${
              show
                ? "text-green-300 transition-all"
                : "text-black transition-all"
            }   font-sans text-4xl w-full rounded-xl px-5 py-3 my-3`}
            onClick={() => {
              show ? setShow(false) : setShow(true);
            }}
          >
            {category}
          </button>
        </li>
        {show
          ? [{ category: "All" }, ...catego].map((c, index) => (
              <li key={index}>
                <button
                  className="bg-black  w-full rounded-xl p-5 my-2"
                  onClick={() => {
                    c.category !== "All" ? Open(c.category) : Default();
                  }}
                >
                  {c.category}
                </button>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default AltCategory;
