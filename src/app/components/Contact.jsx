"use client";
import React from "react";
import ClientForm from "@/app/components/ClientForm";
import Image from "next/image";
import SubHeader from "@/app/components/SubHeader";

const Contact = ({ Action }) => {
  return (
    <div>
      <SubHeader tag="Contact" />
      <p className="lg:text-center font-mono">
        Ready to collaborate or have a project in mind? Feel free to reach out
        to me through the contact form or connect with me on social media.
      </p>
      <div className="grid gap-5 grid-cols-2">
        <ClientForm Action={Action} />
        <div className="col-span-2  relative lg:col-span-1 h-[500px] my-10 py-10 flex justify-center rounded-md  overflow-hidden">
          <Image
            className="object-contain"
            src="/avatar/brandlogo.svg"
            width={500}
            height={500}
            alt="brand"
          />
          <div className="w-fit h-fit absolute top-3 z-10 right-[50%] rounded-full overflow-hidden ">
            <Image
              className="object-contain"
              src="/carousel/image4.png"
              width={80}
              height={80}
              alt="brand"
            />
          </div>
          <div className="w-fit h-fit absolute top-[20%] z-20 right-[25%] rounded-full overflow-hidden ">
            <Image
              className="object-contain"
              src="/carousel/image5.png"
              width={100}
              height={100}
              alt="brand"
            />
          </div>
          <div className="w-fit h-fit absolute top-[40%] z-30 right-[60%] rounded-full overflow-hidden ">
            <Image
              className="object-contain"
              src="/carousel/image3.png"
              width={90}
              height={90}
              alt="brand"
            />
          </div>
          <div className="w-fit h-fit absolute top-[60%] z-30 right-[35%] rounded-full overflow-hidden ">
            <Image
              className="object-contain"
              src="/carousel/image9.png"
              width={110}
              height={110}
              alt="brand"
            />
          </div>
          <div className="w-fit h-fit absolute top-[25%] z-30 right-[45%] rounded-full overflow-hidden ">
            <Image
              className="object-contain"
              src="/carousel/image7.png"
              width={50}
              height={50}
              alt="brand"
            />
          </div>
          <div className="w-fit h-fit absolute top-[0%] z-30 right-[30%] rounded-full overflow-hidden ">
            <Image
              className="object-contain"
              src="/carousel/image2.png"
              width={60}
              height={60}
              alt="brand"
            />
          </div>
          <div className="w-fit h-fit absolute top-[70%] z-30 right-[60%] rounded-full overflow-hidden ">
            <Image
              className="object-contain"
              src="/carousel/image8.png"
              width={40}
              height={40}
              alt="brand"
            />
          </div>
          <div className="w-fit h-fit absolute top-[15%] z-30 right-[70%] rounded-full overflow-hidden ">
            <Image
              className="object-contain"
              src="/carousel/image1.png"
              width={70}
              height={70}
              alt="brand"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
