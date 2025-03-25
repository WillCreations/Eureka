import Round from "@/app/components/Round";
import Link from "next/link";
import PortNav from "@/app/components/PortNav";
import Carousel from "@/app/components/Carousel";
import Image from "next/image";

const portfolio = () => {
  return (
    <div className="min-h-screen my-5 px-10 md:px-28 text-white">
      <PortNav />
      <Carousel />
      <div id="About" className="grid md:grid-cols-2 mt-5">
        <div>
          <h1 className="Header">About Me</h1>
          <h2 className="font-extrabold text-2xl text-blue-200">
            Hey! I'm Princewill Igwe
          </h2>
          <p>
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
            <button className="px-5 py-3 mt-3 rounded-md bg-green-500 text-black">
              Download CV
            </button>
          </Link>
        </div>
        <div></div>
      </div>
      <div id="Portfolio" className="mt-10">
        <h1 className="Header">Portfolio</h1>
        <div className="grid md:grid-cols-2">
          <div className="md:col-span-2 ">
            <h2>Web Development Projects</h2>
            <ul className="w-full grid grid-cols-3 gap-5">
              {[
                {
                  project: "Saint Silas & Ethel",
                  description:
                    "A school web application, built with Next js, React js, Tailwind, Mongo Db, Cloudinary. Using Next 14 proved quite challenging, however I was able to write both backend and frontend code in one application.",
                  link: "www.saintsilas&ethel.com",
                  decoy: "www.saintsilas&ethel.com",
                  image: "/projects/Eureka.PNG",
                },
                {
                  project: "Workout",
                  description:
                    "A chat & workout log application built with a MERN Stack (Mongo Db, Express js, React js, Node js) and Websocket. Building a chat apllication requires real time messaging which I was able to achieve using web sockets.",
                  link: "www.workout.com",
                  decoy: "www.workout.com",
                  image: "/projects/Eureka.PNG",
                },
                {
                  project: "Eureka",
                  description:
                    "An e-commerce web application that doubles as business website, built with Next js, React js, Tailwind,  Mongo Db, Cloudinary. Using Next 14 proved quite challenging,  however I was able to write both backend and frontend code in  one application.",
                  link: "www.eureka.com",
                  decoy: "www.eureka.com",
                  image: "/projects/Eureka.PNG",
                },
              ].map((p, index) => {
                return (
                  <li
                    key={index}
                    className="col-span-full lg:col-span-1  my-5 border-solid border-b-4 border-rounded- border-green-300 "
                  >
                    <div className="rounded-md overflow-hidden">
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
                        <Link href={p.link} className="text-blue-300">
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
        <div className="grid md:grid-cols-2">
          <div></div>
          <div>
            <h2>Graphic Design Projects</h2>
            <ul>
              <li>
                1. Project Name: [Project 1] Description: Brief description of
                the project showcasing design objectives, creative process, and
                final deliverables. Link: [Link to project/images]
              </li>
              <li>
                2. Project Name: [Project 2] Description: Brief description of
                the project showcasing design objectives, creative process, and
                final deliverables. Link: [Link to project/images]
              </li>
            </ul>
          </div>
        </div>
        <div className="grid md:grid-cols-2">
          <div>
            <h2>Motion Design Projects</h2>
            <ul>
              <li>
                1. Project Name: [Project 1] Description: Brief description of
                the project showcasing animation techniques, creative concepts,
                and final results. Link: [Link to project/video]
              </li>
              <li>
                2. Project Name: [Project 2] Description: Brief description of
                the project showcasing animation techniques, creative concepts,
                and final results. Link: [Link to project/video]
              </li>
            </ul>
          </div>
          <div></div>
        </div>
      </div>
      <div id="Skills" className="mt-10">
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
      <div id="Contact" className="mt-10">
        <h1 className="Header">Contact</h1>
        <p>
          Ready to collaborate or have a project in mind? Feel free to reach out
          to me through the contact form or connect with me on social media.
        </p>
      </div>
    </div>
  );
};

export default portfolio;
