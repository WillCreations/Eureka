"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import * as styles from "@/app/Styles/index.module.css";

const Accordion = () => {
  const [isActive, setIsActive] = useState(0);
  const Accordium = useRef(null);
  const controls = useAnimation();
  const inView = useInView(Accordium, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const Arrays = [
    {
      tag: "Full Stack Web Development",
      image: "/accord/webdev.jpg",
      para: "Our expert team brings your digital vision to life with custom-built websites and web applications tailored to your specific needs. With proficiency in a variety of programming languages and frameworks, we ensure your online presence stands out in the crowded digital landscape",
    },
    {
      tag: "Graphic Designs",
      image: "/accord/graphics.jpg",
      para: "Captivate your audience with visually stunning graphics crafted by our talented designers. Whether it's logos, illustrations, infographics, or any other graphical elements, we infuse creativity and innovation into every design to make your brand shine.",
    },
    {
      tag: "UI/UX Design",
      image: "/accord/uiux.jpg",
      para: "User experience is paramount in today's digital world. Our UI/UX experts design intuitive interfaces that not only engage users but also enhance usability and satisfaction, resulting in higher conversions and customer retention.",
    },
    {
      tag: "Brand Identity and Logo Design",
      image: "/accord/brand.jpg",
      para: "Your brand is more than just a logo - it's the essence of your business. Let us help you create a memorable brand identity that resonates with your audience and sets you apart from the competition. From logos to brand guidelines, we ensure consistency across all touchpoints",
    },
    {
      tag: "Motion Graphics",
      image: "/accord/motion.jpg",
      para: "Bring your brand to life with dynamic motion graphics that capture attention and leave a lasting impression. Our skilled animators create visually compelling animations and videos that communicate your message effectively across various platforms.",
    },
    {
      tag: "Magazine and Book Design",
      image: "/accord/book.jpg",
      para: "Impress your readers with visually stunning magazine layouts and book designs. From cover to cover, we blend creativity with functionality to create publications that engage and inspire.",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
      <div className=" col-span-1 flex flex-col justify-between">
        {Arrays.map((array, index) => {
          return (
            <div
              ref={Accordium}
              className={`${styles.AccSlideIn} bg-[#121212] mb-1 lg:mb-0 rounded-lg p-5`}
              key={index}
            >
              <div
                className="flex  pb-5 rounded-lg  justify-between items-center cursor-pointer"
                onClick={() => {
                  setIsActive(index);
                }}
              >
                <div>{array.tag}</div>
                <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }}>
                  {isActive === index ? "-" : "+"}
                </motion.div>
              </div>
              <div
                className={`${
                  isActive === index
                    ? "opacity-1 h-40 bg-black rounded-lg p-5 overflow-scroll transition-all"
                    : "opacity-0 h-0 transition-all"
                }`}
              >
                {array.para}
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={`${styles.BoxSlideIn} col-span-1 bg-[#121212] h-[700px] overflow-hidden rounded-2xl`}
      >
        <Image
          className=" overflow-hidden w-full h-full object-cover lg:object-contain"
          src={isActive === null ? "/accord/home.jpg" : Arrays[isActive]?.image}
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default Accordion;
