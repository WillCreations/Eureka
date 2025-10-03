import { getServerSession } from "next-auth/next";
import { options } from "./api/auth/[...nextauth]/options";
import { connectToDb } from "./(Engine)/mongodb/database";
import Product from "./(Engine)/models/productSchema";
import * as styles from "@/app/Styles/index.module.css";
import Typo from "@/app/components/Typo";
import Image from "next/image";
import Link from "next/link";
import { addClient } from "@/app/(Engine)/actions/addClient";
import Navbutton from "./components/Navbutton";
import Slide from "@/app/components/Slide";
import Testimonial from "@/app/components/Testimonial";
import Contact from "@/app/components/Contact";
import SubHeader from "@/app/components/SubHeader";
import Round from "@/app/components/Round";
import Accordion from "@/app/components/Accordion";
import Offer from "@/app/components/Offer";
import { useMemo } from "react";

// Move static data outside the component for better performance

const Services = [
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
const Offers = [
  {
    Tag: "Bronze",
    Price: 500,
    Bonus: 40,
    Denomination: "k",
    FeatureTag: "Starter Website",
    Feature: ["1–5 pages", "responsive design", "basic SEO", "contact form"],
    Recommended: false,
  },
  {
    Tag: "Silver",
    Price: 1,
    Bonus: 40,
    Denomination: "m",
    FeatureTag: "Business Website",
    Feature: [
      "6–15 pages",
      "blog integration",
      "on-page SEO",
      "CMS (WordPress/Next.js)",
      "analytics setup",
    ],
    Recommended: true,
  },
  {
    Tag: "Gold",
    Price: 2.5,
    Bonus: 52,
    Denomination: "m",
    FeatureTag: "E-Commerce Website",
    Feature: [
      "Unlimited pages",
      "product catalog",
      "payment integration",
      "shipping setup",
      "basic training",
    ],
    Recommended: false,
  },
  {
    Tag: "Platinum",
    Price: 3,
    Bonus: 0,
    Denomination: "m",
    FeatureTag: "Custom Web App",
    Feature: [
      "Tailor-made solutions",
      "advanced integrations",
      "dashboards",
      "API development",
    ],
    Recommended: false,
  },
];

const Clients = [
  {
    name: "Sarah Johnson",
    image: "/testimonial/SarahJohnson.webp",
    profession: "Marketing Manager",
    business: "Horizon Foods",
    rate: 5,
    comment:
      "The team at Eureka completely transformed our online presence. Their creativity and strategy gave us a fresh brand image and increased customer engagement by 40%. They truly feel like an extension of our in-house team.",
  },
  {
    name: "David Okoro",
    image: "/testimonial/DavidOkoro.webp",
    profession: "CEO",
    business: "TechNova Solutions",
    rate: 4,
    comment:
      "They are simply fantastic. We needed a digital partner who understood both technology and storytelling. Eureka delivered beyond expectations — from web design to targeted campaigns. Their work has directly contributed to our growth in new markets.",
  },
  {
    name: "Emily Chen",
    image: "/testimonial/EmilyChen.webp",
    profession: "Founder",
    business: "Bloom Boutique",
    rate: 5,
    comment:
      "As a small business owner, I was worried about investing in digital marketing. But Eureka made the process seamless and results-driven. My sales have doubled in just six months, and my customers love the new website design.",
  },
  {
    name: "Michael Brown",
    image: "/testimonial/MichaelBrown.webp",
    profession: "Real Estate Consultant",
    business: "Future Homes",
    rate: 4,
    comment:
      "I’ve worked with several agencies before, but none compare to Eureka. They built a lead-generation system that keeps my pipeline full. Their professionalism and dedication are second to none.",
  },
  {
    name: "Amina Yusuf",
    image: "/testimonial/AminaYusuf.webp",
    profession: "Program Director",
    business: "Better World Initiative",
    rate: 4,
    comment:
      "Partnering with Eureka has helped us tell our story in a powerful way. Our campaigns now reach thousands more people, and donations have grown significantly. They genuinely care about impact, not just numbers.",
  },
  {
    name: "Carlos Mendes",
    image: "/testimonial/CarlosMendes.webp",
    profession: "Creative Director",
    business: "Vista Media",
    rate: 5,
    comment:
      "Working with Eureka has been an inspiring experience. They brought fresh ideas, executed flawlessly, and consistently delivered on time. Their blend of creativity and technical expertise makes them my go-to agency for digital projects.",
  },
];

export default async function Home() {
  await connectToDb();
  const Prod = await Product.find();
  // Only serialize if needed for child components
  const prodSend = JSON.stringify(Prod);

  const session = await getServerSession(options);
  return (
    <div className="min-h-screen text-white ">
      <div className="bg-[#121212] px-5 xxs:px-10 lg:px-28  h-auto md:gap-5 md:grid grid-cols-2">
        <div className="flex flex-col py-20  justify-start">
          <div>
            <h1 className="text-6xl text-green-300 font-extrabold">
              Welcome to <div className="text-white trans">Eureka</div> Tech.
            </h1>
            <p className="text-justify font-mono text-sm mt-3">
              Are you ready to elevate your online presence to the next level?
              Look no further! At Eureka, we specialize in delivering top-notch
              services across a spectrum of digital domains. From full-stack web
              development to captivating graphic designs, seamless UI/UX
              experiences, compelling brand identities, and everything in
              between, we've got you covered.
            </p>
            <p className="mt-2 font-mono text-sm">
              Start building your Dream Brand Today!
            </p>
            <div className="my-5 ">
              <span>
                <span className="font-mono">Meet </span>{" "}
                <span className="text-white text-2xl font-black ">
                  Princewill Igwe.
                </span>
              </span>
              <Typo />
            </div>
          </div>

          <Navbutton />
        </div>
        <div className="w-full flex items-end justify-center md:justify-end">
          <Link href="/portfolio">
            <div
              className={` ${styles.cover} flex bg-green-300 items-end justify-center hover:scale-90  md:hover:scale-105 md:active:scale-90 w-full h-[500px] shadow-black hover:shadow-stone-950  relative cursor-pointer hover:-rotate-6 transition overflow-hidden mt-14 md:mt-0 rounded-t-2xl hover:rounded-[25px] `}
            >
              <Image
                className="object-contain top translate-y-5"
                src="/me.png"
                width={500}
                height={500}
                alt="Igwe Princewill"
              />
              <div
                className={`${styles.content} absolute px-10 py-5 w-full text center flex items-center bg-black z-[5] text-5xl font-extrabold`}
              >
                <div
                  className={`${styles.contentBox} bg-green-300 rounded-md w-10 h-10 mr-3 `}
                ></div>{" "}
                Port
                <span className="text-green-300">folio</span>
              </div>
              <div
                className={`${styles.backdrop} absolute  z-10 opacity-1  bg-black top-0 bottom-0  w-full h-full`}
              ></div>
            </div>
          </Link>
        </div>
      </div>

      <div className="mx-5 xxs:mx-10 lg:mx-28 my-28 ">
        <SubHeader tag="Ratings" />
        <div className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 ">
          {[100, 90, 80, 60, 50, 30].map((p) => {
            return (
              <div
                key={p}
                className={`${styles.Pop} flex p-5 bg-[#121212] rounded-2xl justify-center items-center`}
              >
                <Round perc={p} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="my-5 px-10 lg:px-28"></div>
      <div className={`px-5 xxs:px-10 lg:px-28 mt-32`}>
        <SubHeader tag="Our Services" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {Services.map((unit) => {
            return (
              <div
                key={unit.tag}
                className={`bg-[#121212] rounded-2xl text-green-300  p-5 ${styles.Pop}`}
              >
                <div className="flex justify-center  h-40 w-full overflow-hidden py-10 my-5">
                  <Image
                    className="block text-center"
                    src={unit.image}
                    width={100}
                    height={100}
                    alt={unit.tag}
                  />
                </div>

                <h4 className="text-2xl text-white font-extrabold">
                  {unit.tag}
                </h4>
                <p className="text-sm font-mono text-left">{unit.para}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className=" mx-5 xxs:mx-10  lg:mx-28 my-32">
        <SubHeader tag="Web Development Pricing" />

        <div className=" grid md:grid-cols-2 lg:grid-cols-3  grid-cols-1  gap-5">
          {Offers?.map((Obj, index) => {
            return (
              <Offer key={index} colour={"[#121212]"} Obj={Obj} index={index} />
            );
          })}
        </div>
      </div>
      <div className=" px-5 xxs:px-10 bg-[#121212] lg:px-28 py-32">
        <SubHeader tag="Graphic Design Pricing" />

        <div className=" grid md:grid-cols-2 lg:grid-cols-3  grid-cols-1  gap-5">
          {Offers?.map((Obj, index) => {
            return (
              <Offer key={index} colour={"black"} Obj={Obj} index={index} />
            );
          })}
        </div>
      </div>
      <div className="mx-5 xxs:mx-10  lg:mx-28 my-32">
        <SubHeader tag="Trending Products" />
        <Slide Prod={prodSend} />
      </div>
      <div className=" px-10 lg:px-28 my-32">
        <SubHeader tag="Why Choose Us" />
        <p
          className={`text-left font-mono lg:text-center text-base ${styles.SlideIn}`}
        >
          At Eureka, we are committed to delivering excellence in every project
          we undertake. Our team of seasoned professionals combines technical
          expertise with creative flair to deliver results that exceed
          expectations. Whether you're a startup looking to establish your
          online presence or an established brand seeking to revamp your digital
          strategy, we have the skills and experience to help you succeed.
        </p>
      </div>
      <div className=" px-5 xxs:px-10 lg:px-28 my-32">
        <SubHeader tag="Testimonials" />
        <p className="text-center font-mono text-base">
          Don't take our word for it, here's what our customers have to say
          about us
        </p>
        <div className="grid grid-cols-1  lg:grid-cols-2  gap-5 my-5 w-full">
          {Clients.map((c, index) => {
            return (
              <div
                key={index}
                className={`${styles.Pop} bg-[#121212] rounded-2xl`}
              >
                <Testimonial client={c} />
              </div>
            );
          })}
        </div>
      </div>

      <div className=" px-5 xxs:px-10 lg:px-28 my-32  ">
        <SubHeader tag="FAQ" />
        <Accordion />
      </div>
      <div className="px-5 xxs:px-10 lg:px-28 my-32">
        <Contact Action={addClient} />
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
