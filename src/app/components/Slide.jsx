"use client";
import * as styles from "@/app/Styles/index.module.css";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const Slide = ({ Prod }) => {
  const [butt, setButt] = useState();
  const [active, setActive] = useState("");
  const containerRef = useRef();
  const thumbsRef = useRef();
  const Product = JSON.parse(Prod);

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
      containerRef.current?.appendChild(items[0]);
      thumbsRef.current?.appendChild(thumbs[0]);
    } else {
      console.log("prev");
      setButt(styles.prev);
      containerRef.current?.prepend(items[Product.length - 1]);
      thumbsRef.current?.prepend(thumbs[Product.length - 1]);
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
      if (nexter?.classList.contains("active")) {
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
      className={`relative inset-0 ${butt}  rounded-md bg-green-300  lg:px-28  overflow-hidden `}
    >
      <div
        ref={containerRef}
        className={`${styles.items}  h-[80vh] box-border relative`}
      >
        {Product.map((p, index) => {
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
                  <h2 className="text-5xl capitalize font-[1000] text-green-500 mb-3">
                    {p.name}
                  </h2>
                  <h2 className="text-xl inline-block shadow-md font-bold bg-white text-green-500 rounded-md  px-5 py-2">
                    {p.price}
                  </h2>

                  <h2 className="text-sm font-bold bg-black py-5 px-10 h-fit mt-3 rounded-md shadow-md">
                    <span className="text-2xl block font-medium  capitalize text-green-300">
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
        className={`${styles.thumbnails} z-[5] absolute bottom-[5%] left-[50%] w-fit flex-shrink-0  overflow-hidden flex gap-2 items-center`}
      >
        {Product.slice(Product.length - (Product.length - 1)).map(
          (p, index) => {
            return (
              <div
                key={index}
                className={`w-28 ${styles.thumb} h-32 shadow-md thumb rounded-md relative overflow-hidden `}
              >
                <Image
                  style={{ objectFit: "cover" }}
                  className="w-full h-full absolute"
                  src={p.image}
                  width={200}
                  height={200}
                />
                <div
                  className={`absolute ${styles.thumbTooltip} px-5 py-3 bg-black hidden text-gray-300 italic shadow-md right-0 left-0 bottom-4`}
                >
                  <h2>{p.name}</h2>
                </div>
              </div>
            );
          }
        )}
        {Product.slice(0, Product.length - (Product.length - 1)).map(
          (p, index) => {
            return (
              <div
                key={index}
                className={`w-28 ${styles.thumb} h-32 shadow-md thumb rounded-md relative overflow-hidden `}
              >
                <Image
                  style={{ objectFit: "cover" }}
                  className="w-full h-full absolute"
                  src={p.image}
                  width={200}
                  height={200}
                />
                <div
                  className={`absolute ${styles.thumbTooltip}  px-5 py-3 bg-black hidden text-gray-300 italic shadow-md right-0 left-0 bottom-4`}
                >
                  <h2>{p.name}</h2>
                </div>
              </div>
            );
          }
        )}
      </div>
      <div
        className={`${styles.arrow} absolute z-[5] flex gap-2 items-center left-[2.5rem] lg:left-[9.5rem] bottom-[5%]`}
      >
        <div
          onClick={() => {
            changer("prev");
          }}
          className="bg-black px-5  arrow-next py-2 cursor-pointer rounded-md"
        >
          Prev
        </div>
        <div
          onClick={() => {
            changer("next", true);
          }}
          id="next"
          className={`bg-black px-5 py-2 ${active} cursor-pointer rounded-md`}
        >
          Next
        </div>
      </div>
      <div className={styles.time}></div>
    </div>
  );
};

export default Slide;
