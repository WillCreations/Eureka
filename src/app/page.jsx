import { getServerSession } from "next-auth/next";
import { options } from "./api/auth/[...nextauth]/options";
import Card from "./components/Card";
import { connectToDb } from "./(Engine)/mongodb/database";
import Product from "./(Engine)/models/productSchema";
import * as styles from "@/app/Styles/index.module.css";
import Typo from "@/app/components/Typo";
import Slider from "./components/Slider";
import Box from "@/app/components/Box";
import Image from "next/image";
import Link from "next/link";
import Navbutton from "./components/Navbutton";
import Slide from "@/app/components/Slide";
import Round from "@/app/components/Round";

export default async function Home() {
  await connectToDb();
  const Prod = await Product.find();
  const prodSend = JSON.stringify(Prod);
  const Crod = [
    {
      name: "package 1",
      image: "/Package 01.png",
      price: "$100",
      category: "bronze",
      description: "package 1 description",
    },
    {
      name: "package 2",
      image: "/Package 02.png",
      price: "$200",
      category: "silver",
      description: "package 2 description",
    },
    {
      name: "package 3",
      image: "/Package 03.png",
      price: "$300",
      category: "gold",
      description: "package 3 description",
    },
    {
      name: "package 4",
      image: "/Package 04.png",
      price: "$400",
      category: "platinum",
      description: "package 4 description",
    },
  ];

  const session = await getServerSession(options);
  return (
    <div className="min-h-screen text-white">
      <div className="bg-blue-500  px-10 md:px-28 py-20 h-auto md:gap-5 md:grid grid-cols-2">
        <div className="flex flex-col  justify-start">
          <div>
            <h1 className="text-4xl font-extrabold">Welcome to Eureka Tech</h1>
            <p className="text-justify text-sm mt-3">
              Are you ready to elevate your online presence to the next level?
              Look no further! At Eureka, we specialize in delivering top-notch
              services across a spectrum of digital domains. From full-stack web
              development to captivating graphic designs, seamless UI/UX
              experiences, compelling brand identities, and everything in
              between, we've got you covered
            </p>
            <p className="mt-2 text-sm">
              Start building your Dream Brand Today!
            </p>
            <div className="my-5">
              <p>
                Meet{" "}
                <span className="text-black text-2xl font-extrabold ">
                  Princewill Igwe.
                </span>
              </p>
              <Typo />
            </div>
          </div>

          <Navbutton />
        </div>
        <div className="w-full flex items-end justify-end">
          <Link href="/portfolio">
            <div
              className={` ${styles.cover} flex items-end justify-center hover:scale-90  md:hover:scale-105 md:active:scale-90 w-full h-[500px] shadow hover:shadow-2xl  relative cursor-pointer hover:-rotate-6 transition overflow-hidden mt-14 md:mt-0 rounded-md`}
            >
              <Image
                className="object-contain top translate-y-5"
                src="/me.png"
                width={1000}
                height={1000}
                alt="Igwe Princewill"
              />
              <h1 className=" absolute p-1 rounded-md bg-black z-[5] text-5xl font-extrabold">
                Portfolio
              </h1>
              <div className="absolute  z-10 opacity-1  bg-black top-0 bottom-0  w-full h-full"></div>
            </div>
          </Link>
        </div>
      </div>
      <div className="mx-10 md:mx-28 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 my-28 ">
        {[25, 50, 60, 80, 90, 100].map((p) => {
          return (
            <div key={p} className="flex justify-center items-center">
              <Round perc={p} />
            </div>
          );
        })}
      </div>
      <div className="my-5 px-10 md:px-28"></div>
      <div className={`px-10 md:px-28 mt-32`}>
        <h2 className="text-2xl my-5 font-semibold text-blue-300 text-center">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[
            {
              tag: "Full Stack Web Development",
              para: "Our expert team brings your digital vision to life with custom-built websites and web applications tailored to your specific needs. With proficiency in a variety of programming languages and frameworks, we ensure your online presence stands out in the crowded digital landscape",
            },
            {
              tag: "Graphic Designs",
              para: "Captivate your audience with visually stunning graphics crafted by our talented designers. Whether it's logos, illustrations, infographics, or any other graphical elements, we infuse creativity and innovation into every design to make your brand shine.",
            },
            {
              tag: "UI/UX Design",
              para: "User experience is paramount in today's digital world. Our UI/UX experts design intuitive interfaces that not only engage users but also enhance usability and satisfaction, resulting in higher conversions and customer retention.",
            },
            {
              tag: "Brand Identity and Logo Design",
              para: "Your brand is more than just a logo - it's the essence of your business. Let us help you create a memorable brand identity that resonates with your audience and sets you apart from the competition. From logos to brand guidelines, we ensure consistency across all touchpoints",
            },
            {
              tag: "Motion Graphics",
              para: "Bring your brand to life with dynamic motion graphics that capture attention and leave a lasting impression. Our skilled animators create visually compelling animations and videos that communicate your message effectively across various platforms.",
            },
            {
              tag: "Magazine and Book Design",
              para: "Impress your readers with visually stunning magazine layouts and book designs. From cover to cover, we blend creativity with functionality to create publications that engage and inspire.",
            },
          ].map((unit) => {
            return (
              <div
                key={unit.tag}
                className={`bg-white rounded-md text-black p-5 ${styles.Service}`}
              >
                <div className="flex justify-center my-5">
                  <Image
                    className="block text-center"
                    src="/avatar/avatar.svg"
                    width={100}
                    height={100}
                    alt={unit.tag}
                  />
                </div>

                <h4 className="text-xl font-extrabold">{unit.tag}</h4>
                <p className="text-xs text-justify">{unit.para}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Slide Prod={prodSend} />
      <div className="my-5 px-10 md:px-28 mt-32">
        <h2 className="text-2xl my-5 font-semibold text-blue-300 text-center ">
          Why Choose us
        </h2>
        <p className={`text-justify ${styles.SlideIn}`}>
          At Eureka, we are committed to delivering excellence in every project
          we undertake. Our team of seasoned professionals combines technical
          expertise with creative flair to deliver results that exceed
          expectations. Whether you're a startup looking to establish your
          online presence or an established brand seeking to revamp your digital
          strategy, we have the skills and experience to help you succeed.
        </p>
      </div>
      <div className="my-5 px-10 md:px-28 mt-32">
        <h2 className="text-2xl my-5 font-semibold text-blue-300 text-center">
          Testimonials
        </h2>
        <p className="text-center">
          Don't take our word for it, here's what our customers have to say
          about us
        </p>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {/* <Slider Prod={Prod} /> */}
      {/* <div
        className='w-full mt-10 py-10 gap-4 flex justify-between overflow-scroll overflow-x-auto h-auto bg-gray-950'
      >
        <div  className={styles.slide2}>
          {Prod.map((p) => {
            return (
              <div key={p._id} className={styles.card} >
                <Card
                  prod={p}
                >
                  <Box
                    prod={p}
                  />
                </Card>
              </div>
            )
          })}
        </div>
      </div> */}
    </div>
  );
}
