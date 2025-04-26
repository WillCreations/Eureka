"use client";
import Image from "next/image";
import { useState } from "react";
import React from "react";

const Accordion = () => {
  const [isActive, setIsActive] = useState(null);

  const Arrays = [
    {
      tag: "Full Stack Web Development",
      image: "/avatar/web.svg",
      para: "Our expert team brings your digital vision to life with custom-built websites and web applications tailored to your specific needs. With proficiency in a variety of programming languages and frameworks, we ensure your online presence stands out in the crowded digital landscape",
    },
    {
      tag: "Graphic Designs",
      image: "/avatar/graphics.svg",
      para: "Captivate your audience with visually stunning graphics crafted by our talented designers. Whether it's logos, illustrations, infographics, or any other graphical elements, we infuse creativity and innovation into every design to make your brand shine.",
    },
    {
      tag: "UI/UX Design",
      image: "/avatar/UI.svg",
      para: "User experience is paramount in today's digital world. Our UI/UX experts design intuitive interfaces that not only engage users but also enhance usability and satisfaction, resulting in higher conversions and customer retention.",
    },
    {
      tag: "Brand Identity and Logo Design",
      image: "/avatar/brand.svg",
      para: "Your brand is more than just a logo - it's the essence of your business. Let us help you create a memorable brand identity that resonates with your audience and sets you apart from the competition. From logos to brand guidelines, we ensure consistency across all touchpoints",
    },
    {
      tag: "Motion Graphics",
      image: "/avatar/motion.svg",
      para: "Bring your brand to life with dynamic motion graphics that capture attention and leave a lasting impression. Our skilled animators create visually compelling animations and videos that communicate your message effectively across various platforms.",
    },
    {
      tag: "Magazine and Book Design",
      image: "/avatar/books.svg",
      para: "Impress your readers with visually stunning magazine layouts and book designs. From cover to cover, we blend creativity with functionality to create publications that engage and inspire.",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-5 ">
      <div className=" col-span-1">
        {Arrays.map((array, index) => {
          return (
            <div className="bg-[#121212] mb-5 rounded-lg p-5" key={index}>
              <div
                className="flex  pb-5 rounded-lg  justify-between items-center cursor-pointer"
                onClick={() => {
                  if (isActive === index) {
                    setIsActive(null);
                  } else {
                    setIsActive(index);
                  }
                }}
              >
                <div>{array.tag}</div>
                <div>{isActive === index ? "-" : "+"}</div>
              </div>
              <div
                className={`${
                  isActive === index
                    ? "opacity-1 h-40 bg-black rounded-lg p-5 transition-all"
                    : "opacity-0 h-0 transition-all"
                }`}
              >
                {array.para}
              </div>
            </div>
          );
        })}
      </div>
      <div className="col-span-1 h-[700px] border-2 border-green-300 border-solid overflow-hidden rounded-lg">
        <Image
          className=" overflow-hidden border-2 border-red-300 border-solid"
          style={{ objectFit: "contain" }}
          src={isActive === null ? "/personHead.svg" : Arrays[isActive]?.image}
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default Accordion;
