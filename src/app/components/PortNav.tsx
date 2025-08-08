import React from "react";

const PortNav = ({ aboutRef, projectRef, skillRef, contactRef, Action }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:flex-row my-10 justify-between">
      <div className="text-4xl text-green-300 font-bold my-2">Portfolio</div>
      <div className="grid grid-cols-4 gap-2 justify-center items-center">
        {[
          { link: "about", ref: aboutRef },
          { link: "projects", ref: projectRef },
          { link: "skills", ref: skillRef },
          { link: "contact", ref: contactRef },
        ].map((li, index) => {
          return (
            <div
              onClick={() => {
                Action(li.ref);
              }}
              key={index}
              className="capitalize text-center py-2 text-xs md:text-base border-solid border-2 border-green-300 rounded-xl cursor-pointer hover:text-black hover:bg-green-300 transition-all active:animate-bounce text-green-300"
            >
              {li.link}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PortNav;
