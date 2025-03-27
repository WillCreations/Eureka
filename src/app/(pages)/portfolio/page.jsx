import Round from "@/app/components/Round";
import Link from "next/link";
import PortNav from "@/app/components/PortNav";
import Carousel from "@/app/components/Carousel";
import CarouselGrid from "@/app/components/CarouselGrid";
import ClientForm from "@/app/components/ClientForm";
import Image from "next/image";
import { addClient } from "@/app/(Engine)/actions/addClient";

const portfolio = () => {
  const picture = [
    { name: "image1", image: "/carousel/image1.png" },
    { name: "image2", image: "/carousel/image2.png" },
    { name: "image3", image: "/carousel/image3.png" },
    { name: "image4", image: "/carousel/image4.png" },
    { name: "image5", image: "/carousel/image5.png" },
    { name: "image6", image: "/carousel/image6.png" },
    { name: "image7", image: "/carousel/image7.png" },
    { name: "image8", image: "/carousel/image8.png" },
    { name: "image9", image: "/carousel/image9.png" },
    { name: "image10", image: "/carousel/image10.png" },
  ];
  return (
    <div className="min-h-screen my-5 px-10 lg:px-28 text-white">
      <PortNav />

      <div id="About" className="gap-5 grid md:grid-cols-2 mt-5">
        <div>
          <h1 className="Header">About Me</h1>
          <h2 className="font-extrabold text-2xl text-blue-200">
            Hey! I'm Princewill Igwe
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

          <Link href="/cv.docx" download="Princewill Igwe.pdf">
            <button className="px-5 py-3 mt-3 hover:bg-green-300 rounded-md bg-green-500 text-black">
              Download CV
            </button>
          </Link>
        </div>
        <div
          className={` flex items-end md:justify-end lg:scale-[1.08] justify-center w-full h-[500px] shadow hover:shadow-2xl  relative cursor-pointer  transition overflow-hidden mt-14 md:mt-0 rounded-md`}
        >
          <Image
            className="object-contain top translate-y-[200px] "
            src="/me.png"
            width={500}
            height={500}
            alt="Igwe Princewill"
          />
        </div>
      </div>
      <div id="Portfolio" className="mt-28">
        <h1 className="Header">Portfolio</h1>
        <div className="grid md:grid-cols-2">
          <div className="md:col-span-2 ">
            <h2 className="subHeader">Web Development Projects</h2>
            <ul className="w-full grid grid-cols-3 gap-5">
              {[
                {
                  project: "Saint Silas & Ethel",
                  description:
                    "A school web application, built with Next js, React js, Tailwind, MongoDb, Cloudinary. Using Next 14 proved quite challenging, however I was able to write both backend and frontend code in one application.",
                  link: "http://localhost:3000",
                  decoy: "www.saintsilas&ethel.com",
                  image: "/projects/school.png",
                },
                {
                  project: "Workout Buddy",
                  description:
                    "A social media chat application that encourages friends to keep up with workout routines, built with MERN Stack (Mongo Db, Express js, React js, Node js), socket.io, bcrypt, mongoose etc. Building a chat apllication requires real time messaging which I was able to achieve using web sockets.",
                  link: "http://localhost:5173",
                  decoy: "www.workout.com",
                  image: "/projects/workout.png",
                },
                {
                  project: "Eureka",
                  description:
                    "An e-commerce web application that doubles as business website, built with Next js, React js, Tailwind,  MongoDb, Cloudinary. Using Next 14 proved quite challenging, however I was able to write both backend and frontend code in  one application.",
                  link: "http://localhost:3001",
                  decoy: "www.eureka.com",
                  image: "/projects/Eureka.PNG",
                },
              ].map((p, index) => {
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
        <div className="my-10 items-center grid gap-5 lg:grid-cols-2">
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
        <div className="my-10 items-center grid gap-5 lg:grid-cols-2">
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
      <div id="Skills" className="mt-28">
        <h1 className="Header">Skills</h1>
        <ul className="grid my-5 gap-10 grid-cols-3">
          <li className="GroupOne">
            <h3 className="Heading">Web Development: </h3>
            <ul className="Inner">
              <li className="Skill">
                <div>
                  <h3 className="subHeading">Front-end:</h3>
                  <ol>
                    <li>HTML</li> <li>CSS</li> <li>JavaScript</li>
                    <li>React.js</li> <li>Vue.js</li>
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
                <li>Blender</li>
              </ol>
            </div>

            <div className="roundBox">
              <Round perc={90} />
            </div>
          </li>
        </ul>
      </div>
      <div id="Contact" className="mt-28">
        <h1 className="Header">Contact</h1>
        <p className="lg:text-center">
          Ready to collaborate or have a project in mind? Feel free to reach out
          to me through the contact form or connect with me on social media.
        </p>
        <div className="grid gap-5 grid-cols-2">
          <ClientForm Action={addClient} />
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
    </div>
  );
};

export default portfolio;
