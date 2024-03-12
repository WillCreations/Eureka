"use client";
import * as styles from "@/app/Styles/index.module.css";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const Slide = ({ Prod }) => {
  const [butt, setButt] = useState();
  const [active, setActive] = useState("");
  const containerRef = useRef();
  const thumbsRef = useRef();

  let Time = 2000;
  let runTime;

  const changer = (type, active) => {
    const items = document.querySelectorAll(".selected");
    const thumbs = document.querySelectorAll(".thumb");

    if (type === "next") {
      if (active) {
        setActive("active");
      }
      console.log("next");
      setButt(styles.next);
      containerRef.current.appendChild(items[0]);
      thumbsRef.current.appendChild(thumbs[0]);
    } else {
      console.log("prev");
      setButt(styles.prev);
      containerRef.current.prepend(items[Prod.length - 1]);
      thumbsRef.current.prepend(thumbs[Prod.length - 1]);
    }
    clearTimeout(runTime);
    runTime = setTimeout(() => {
      setButt("");
    }, Time);
  };

  const AutoSlider = () => {
    const interval = setInterval(() => {
      changer("next");
      const nexter = document.getElementById("next");
      console.log(nexter, "nexter");
      if (nexter.classList.contains("active")) {
        clearInterval(interval);
      }
    }, 10000);
  };
  useEffect(() => {
    AutoSlider();
  }, []);

  // useEffect(() => {
  //   const autoCheck = () => {
  //     setTimeout(() => {
  //       if (!butt) {
  //         AutoSlider();
  //       }
  //     }, 30000);
  //   };

  //   autoCheck();
  // }, [butt]);

  return (
    <div
      className={`relative inset-0 ${butt}  lg:px-28 mt-32 overflow-hidden `}
    >
      <div className="text-2xl my-5 font-semibold text-blue-300 text-center">
        Our Products
      </div>
      <div
        ref={containerRef}
        className={`${styles.items} h-[80vh] box-border relative`}
      >
        {Prod.map((p, index) => {
          return (
            <div key={index} className="absolute item  selected inset-0">
              <div className="h-full w-full  relative overflow-hidden">
                <Image
                  style={{ objectFit: "cover" }}
                  className="w-full h-full absolute"
                  src={p.image}
                  alt="image"
                  width={500}
                  height={500}
                />
                <div className="absolute top-10 left-10">
                  <h2 className="text-5xl capitalize font-black text-green-500 mb-3">
                    {p.name}
                  </h2>
                  <h2 className="text-xl inline-block font-bold bg-white text-green-500 rounded-md  px-5 py-2">
                    {p.price}
                  </h2>

                  <h2 className="text-xl bg-black py-2 px-2 h-28 mt-3 rounded-md shadow-md">
                    <span className="text-3xl block font-black  capitalize text-yellow-500">
                      {p.category}
                    </span>
                    {p.description}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        ref={thumbsRef}
        className={`${styles.thumbnails} z-10 absolute left-[50%] w-fit flex-shrink-0 bottom-1 overflow-hidden flex gap-2 items-center`}
      >
        {Prod.slice(Prod.length - (Prod.length - 1)).map((p, index) => {
          return (
            <div
              key={index}
              className="w-28 h-32 thumb rounded-md relative overflow-hidden "
            >
              <Image
                style={{ objectFit: "cover" }}
                className="w-full h-full absolute"
                src={p.image}
                width={200}
                height={200}
              />
              <div className="absolute right-1 left-1 bottom-1">
                <h2>{p.name}</h2>
              </div>
            </div>
          );
        })}
        {Prod.slice(0, Prod.length - (Prod.length - 1)).map((p, index) => {
          return (
            <div
              key={index}
              className="w-28 h-32 thumb rounded-md relative overflow-hidden "
            >
              <Image
                style={{ objectFit: "cover" }}
                className="w-full h-full absolute"
                src={p.image}
                width={200}
                height={200}
              />
              <div className="absolute right-1 left-1 bottom-1">
                <h2>{p.name}</h2>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={`${styles.arrow} absolute z-[50] flex gap-2 items-center left-[9.5rem] bottom-10`}
      >
        <div
          onClick={() => {
            changer("prev");
          }}
          className="bg-black px-5  arrow-next py-2 cursor-pointer rounded-sm"
        >
          Prev
        </div>
        <div
          onClick={() => {
            changer("next", true);
          }}
          id="next"
          className={`bg-black px-5 py-2 ${active} cursor-pointer rounded-sm`}
        >
          Next
        </div>
      </div>
      <div className={styles.time}></div>
    </div>
  );
};

export default Slide;
