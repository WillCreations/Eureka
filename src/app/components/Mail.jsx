"use client";
import React from "react";
import Link from "next/link";

const Mail = ({ cli, Action }) => {
  const Wrapper = async () => {
    await Action(cli._id);
  };
  return (
    <div
      onClick={() => {
        Wrapper();
      }}
    >
      <Link href={`/inbox/${cli._id}`}>
        <div className="bg-white h-28 my-2 rounded-md text-black px-10 py-5 ">
          <div>
            <div>
              {cli.firstName ? `${cli.firstName} ${cli.lastName}` : "Anonymous"}
            </div>
            <div>{cli.message}</div>
          </div>
          <div>
            <button></button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Mail;
