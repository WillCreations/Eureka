"use client";
import React, { useRef } from "react";
import Round from "@/app/components/Round";
import Link from "next/link";
import PortNav from "@/app/components/PortNav";
import Carousel from "@/app/components/Carousel";
import CarouselGrid from "@/app/components/CarouselGrid";
import * as styles from "@/app/Styles/index.module.css";
import Contact from "./Contact";
import Image from "next/image";
import ScrollToTop from "@/app/components/ScrollToTop";
import { useSession } from "next-auth/react";

const PortfolioPage = ({
  projects,
  picture,
  Socials,
  skills,
  addClient,
  inbox,
}) => {
  const aboutRef = useRef(null);
  const skillRef = useRef(null);
  const projectRef = useRef(null);
  const contactRef = useRef(null);
  const offSet = 115;
  const { data: session } = useSession();
  console.log({ sessioObject: session?.user });

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - offSet,
      behavior: "smooth",
    });
  };

  // you can also use the follwing code alternatively
  // const scrollToSection = (elementRef: any) => {
  //   elementRef.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start"
  //   });
  // };

  return (
    <div>
      <ScrollToTop />
      <PortNav
        aboutRef={aboutRef}
        projectRef={projectRef}
        skillRef={skillRef}
        contactRef={contactRef}
        Action={scrollToSection}
      />

      <div id="About" ref={aboutRef} className="gap-5 grid md:grid-cols-2 mt-5">
        <div>
          <h1 className="Header">About Me</h1>
          <h2 className="font-extrabold text-6xl my-5 text-blue-200">
            Hey! I'm <br />
            Princewill Igwe
          </h2>
          <p className="text-justify text-gray-100">
            A Highly skilled seasoned professional with expertise in creating
            and implementing innovative web solutions. Proficient in front-end
            and back-end technologies, with a strong foundation in full-stack
            development. Versatile in collaborating with cross-functional teams
            to drive project success. Passionate about staying up-to-date with
            the latest industry trends and technologies. possessing a keen eye
            for graphic and motion design. With a strong foundation in computer
            science and design principles, I strive to deliver solutions that
            are not only functional but also visually compelling.
          </p>

          <div className="w-full my-5 grid md:grid-cols-5  gap-5 justify-between items-center">
            <div className="flex-nowrap col-span-2 ">
              <Link href="/cv.docx" download="Princewill Igwe.pdf">
                <button className="px-5 py-3 hover:bg-green-300 rounded-md bg-green-500 text-black">
                  Download CV
                </button>
              </Link>
            </div>
            <div className=" md:col-span-3  flex justify-start  gap-3">
              {Socials.map((one, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-center border-solid object-contain overflow-hidden border-2 border-green-300 rounded-full h-11 w-11 p-2"
                  >
                    <Image
                      src={one.image}
                      className=""
                      height={500}
                      width={500}
                      alt="skill logos"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className={`relative flex items-end md:justify-end lg:scale-[1.08] justify-center w-full h-[500px] shadow hover:shadow-2xl cursor-pointer  transition overflow-hidden mt-14 md:mt-0 rounded-md`}
        >
          <Image
            className="object-contain top translate-y-[200px] "
            src="/me.png"
            width={500}
            height={500}
            alt="Igwe Princewill"
          />
          {session?.user?.admin && (
            <Link href="/inbox">
              <div className="absolute w-20 h-20 bg-green-300 p-3 rounded-md right-[5%] bottom-[5%]">
                {" "}
                <Image
                  className="object-contain top "
                  src="/Mail.svg"
                  width={100}
                  height={100}
                  alt="mail"
                />
              </div>
              {inbox !== 0 && (
                <div className="text-xs flex justify-center items-center text-center w-10 h-10 bg-red-900 text-white py-1 px-2 rounded-full absolute right-[2%] bottom-[17%]">
                  <div>{inbox}</div>
                </div>
              )}
            </Link>
          )}
        </div>
      </div>
      <div id="Project" ref={projectRef} className="mt-28">
        <h1 className="Header">Projects</h1>
        <div className="grid md:grid-cols-2">
          <div className="md:col-span-2 ">
            <h2 className="subHeader">Web Development Projects</h2>
            <ul className="w-full grid grid-cols-3 gap-5">
              {projects.map((p, index) => {
                return (
                  <li
                    key={index}
                    className="col-span-full lg:col-span-1  my-5 border-solid border-b-2 rounded-b-md border-green-300 "
                  >
                    <div className="rounded-md border-solid border-2 border-green-300 overflow-hidden">
                      <Image
                        className="object-contain"
                        src={p.image}
                        width={1000}
                        height={1000}
                        alt={p.project}
                      />
                    </div>
                    <div className="my-5">
                      <div>
                        <span className="text-green-300 font-semibold text-md lg:text-xl">
                          {p.project}
                        </span>
                      </div>{" "}
                      <div className="italic text-base text-gray-400">
                        <p> {p.description}</p>
                      </div>{" "}
                      <div>
                        <Link
                          href={p.link}
                          target="blank"
                          className="text-blue-300"
                        >
                          {p.decoy}
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div></div>
        </div>
        <div className="my-28 items-center grid gap-5 lg:grid-cols-2">
          <Carousel p={picture} key={0} />
          <div>
            <h2 className="subHeader">Graphic Design Projects</h2>
            <div className="projectList">
              <ul>
                <li>
                  - Designed over 100+ logos, flyers, posters, and magazines for
                  over 100+ client, brands, individuals and business
                  organizations displaying impeccable design thinking skills to
                  foster their objectives and properly tell their story.
                </li>
                <li>
                  - Collaborated closely with clients to understand their
                  requirements and delivered tailored solutions within
                  established timelines.
                </li>
              </ul>
              <CarouselGrid picture={picture} />
            </div>
          </div>
        </div>
        <div className="my-28 items-center grid gap-5 lg:grid-cols-2">
          <div>
            <h2 className="subHeader">Motion Design Projects</h2>
            <div className="projectList">
              <ul>
                <li>
                  1. Project Name: [Project 1] Description: Brief description of
                  the project showcasing animation techniques, creative
                  concepts, and final results. Link: [Link to project/video]
                </li>
                <li>
                  2. Project Name: [Project 2] Description: Brief description of
                  the project showcasing animation techniques, creative
                  concepts, and final results. Link: [Link to project/video]
                </li>
              </ul>
              <CarouselGrid picture={picture} />
            </div>
          </div>
          <Carousel p={picture} key={1} />
        </div>
      </div>
      <div id="Skills" ref={skillRef} className="mt-28">
        <h1 className="Header">Skills</h1>
        <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-5 my-10">
          {skills.map((one, index) => {
            return (
              <div
                key={index}
                className={`rounded-md relative ${styles?.skill} hover:bg-green-300  flex justify-center p-5 items-center col-span-1  border-solid border-green-300 border-2`}
              >
                <div
                  className={`${styles?.skillLogo} w-36 h-36 transition-all py-5 flex justify-center overflow-hidden`}
                >
                  <Image
                    src={one.image}
                    className=""
                    height={500}
                    width={500}
                    alt="skill logos"
                  />
                </div>
                <div
                  className={`${styles?.skillLogoBlack} w-36 h-36 hidden transition-all py-5  overflow-hidden `}
                >
                  <Image
                    src={one.black}
                    className=""
                    height={500}
                    width={500}
                    alt="skill logos"
                  />
                </div>
                <div
                  className={`hidden absolute -bottom-[15%] h-10 w-full right-0 left-0 ${styles.skillName} `}
                >
                  <div className=" bg-green-300 text-black px-3 py-2 rounded-md ">
                    {one.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <ul className="grid my-5 gap-10 grid-cols-3">
          <li className="GroupOne">
            <h3 className="Heading">Web Development: </h3>
            <ul className="Inner">
              <li className="Skill">
                <div>
                  <h3 className="subHeading">Front-end:</h3>
                  <ol>
                    <li>HTML</li> <li>CSS</li> <li>JavaScript</li>
                    <li>React.js</li> <li>NEXT.js</li>
                  </ol>
                </div>
                <div className="roundBox">
                  <Round perc={90} />
                </div>
              </li>
              <li className="Skill">
                <div className="roundBox">
                  <Round perc={90} />
                </div>
                <div>
                  <h3 className="subHeading">Back-end:</h3>
                  <ol>
                    <li>Node.js</li>
                    <li> Express.js</li> <li>RESTful APIs</li>
                  </ol>
                </div>
              </li>
              <li className="Skill">
                <div>
                  <h3 className="subHeading">Databases:</h3>
                  <ol>
                    <li>MongoDB</li> <li>MySQL</li> <li>PostgreSQL</li>
                  </ol>
                </div>
                <div className="roundBox">
                  <Round perc={90} />
                </div>
              </li>
              <li className="Skill">
                <div className="roundBox">
                  <Round perc={90} />
                </div>
                <div>
                  <h3 className="subHeading">Version Control:</h3>{" "}
                  <ol>
                    <li>Git</li> <li>GitHub</li>
                  </ol>
                </div>
              </li>
              <li className="Skill">
                <div>
                  <h3 className="subHeading">Deployment:</h3>{" "}
                  <ol>
                    <li>Heroku</li> <li>vercel</li> <li>Netlify</li>{" "}
                    <li>AWS</li>
                  </ol>
                </div>
                <div className="roundBox">
                  <Round perc={90} />
                </div>
              </li>
            </ul>
          </li>
          <li className="Group">
            <div>
              <h3 className="Heading">Graphic Design:</h3>
              <ol>
                <li>Adobe Photoshop,</li> <li>Illustrator,</li>{" "}
                <li>InDesign</li>
              </ol>
            </div>
            <div className="roundBox">
              <Round perc={90} />
            </div>
          </li>
          <li className="Group">
            <div>
              <h3 className="Heading">Ui/Ux:</h3>{" "}
              <ol>
                <li>Figma,</li> <li>Adobe XD</li>
              </ol>
            </div>

            <div className="roundBox">
              <Round perc={90} />
            </div>
          </li>
          <li className="Group">
            <div>
              <h3 className="Heading">Motion Design:</h3>{" "}
              <ol>
                <li>Adobe After Effects,</li> <li>Premiere Pro,</li>{" "}
                <li>CapCut</li>
              </ol>
            </div>

            <div className="roundBox">
              <Round perc={90} />
            </div>
          </li>
        </ul>
      </div>
      <div id="Contact" ref={contactRef} className="mt-28">
        <Contact Action={addClient} />
      </div>
    </div>
  );
};

export default PortfolioPage;
