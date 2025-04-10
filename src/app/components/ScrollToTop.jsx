import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaAngleUp } from "react-icons/fa6";

const ScrollToTop = () => {
  const [showScroller, setShowScroller] = useState(false);

  //   useEffect(() => {
  //     if (window.scrollY > window.VisualViewport.length) {
  //       setShowScroller(true);
  //     } else {
  //       setShowScroller(false);
  //     }
  //   }, [window.scrollY]);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowScroller(true);
      } else {
        setShowScroller(false);
      }
    });
  }, []);

  const Scroller = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {showScroller && (
        <div
          onClick={() => {
            Scroller();
          }}
          className="fixed bg-[#121212] text-xl text-green-300 z-[500] bottom-5 rounded-full p-3 right-10 hover:bottom-3 active:bottom-5  h-14 w-14 flex justify-center items-center  overflow-hidden transition cursor-pointer "
        >
          {/* <Image
            style={{ objectFit: "contain" }}
            className="transition-transform rotate-90 hover:scale-110"
            src="/arrow.png"
            alt="whatsapp"
            width={50}
            height={50}
          /> */}

          <FaAngleUp />
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;
