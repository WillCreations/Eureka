"use client";
import * as styles from "@/app/Styles/index.module.css";
import Image from "next/image";
import { useState, useRef } from "react";

const Slide = ({ Prod }) => {
  const [butt, setButt] = useState();
  const containerRef = useRef();
  const thumbsRef = useRef();

  let Time = 2000;
  let runTime;

  const changer = (type) => {
    const items = document.querySelectorAll(".selected");
    const thumbs = document.querySelectorAll(".thumb");

    if (type === "next") {
      console.log("next");
      setButt(styles.next);
      const contain = document.querySelector("Styles_items__0wFaC");
      console.log(containerRef.current, "kpali");
      console.log(thumbsRef.current, "kpali-2");
      containerRef.current.appendChild(items[0]);
      thumbsRef.current.appendChild(thumbs[0]);
      console.log(items, " domitems");
      console.log(thumbs, " domitems-2");
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
  return (
    <div className={`relative inset-0 ${butt} md:px-28 mt-32 `}>
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
                  <h2>{p.name}</h2>
                  <h2>{p.price}</h2>
                  <h2>{p.category}</h2>
                  <h2>{p.description}</h2>
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
        className={`${styles.arrow} absolute z-[50] flex gap-2 items-center left-28 bottom-10`}
      >
        <div
          onClick={() => {
            changer("prev");
          }}
          className="bg-black px-5 py-2 cursor-pointer rounded-sm"
        >
          Prev
        </div>
        <div
          onClick={() => {
            changer("next");
          }}
          className="bg-black px-5 py-2 cursor-pointer rounded-sm"
        >
          Next
        </div>
      </div>
      <div className={styles.time}></div>
    </div>
  );
};

export default Slide;
