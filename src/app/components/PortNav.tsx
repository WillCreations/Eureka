import React from "react";

const PortNav = ({ aboutRef, projectRef, skillRef, contactRef, Action }) => {
  return (
    <div className="flex flex-col md:flex-row my-10 justify-between">
      <div className="text-4xl text-green-300 font-bold my-2">Portfolio</div>
      <div className="flex justify-center items-center">
        {[
          { link: "about", ref: aboutRef },
          { link: "project", ref: projectRef },
          { link: "skill", ref: skillRef },
          { link: "contact", ref: contactRef },
        ].map((li, index) => {
          return (
            <div
              onClick={() => {
                Action(li.ref);
              }}
              key={index}
              className="capitalize mx-5 cursor-pointer hover:underline text-green-300"
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
