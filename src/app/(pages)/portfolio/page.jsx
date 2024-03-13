import React from "react";
import Round from "@/app/components/Round";
import Link from "next/link";

const portfolio = () => {
  return (
    <div className="min-h-screen my-5 px-10 md:px-28">
      <div className="grid md:grid-cols-2 mt-5">
        <div>
          <h1 className="Header">About Me</h1>
          <h2 className="font-extrabold text-2xl text-blue-200">
            Hey! I'm Princewill Igwe
          </h2>
          <p>
            A seasoned professional with expertise in both front-end and
            back-end development, coupled with a keen eye for graphic and motion
            design. With a strong foundation in computer science and design
            principles, I strive to deliver solutions that are not only
            functional but also visually compelling.
          </p>

          <Link href="/cv.docx" download="Princewill Igwe.pdf">
            <button className="px-5 py-3 mt-3 rounded-md bg-green-500 text-black">
              Download CV
            </button>
          </Link>
        </div>
        <div></div>
      </div>
      <div className="mt-10">
        <h1 className="Header">Portfolio</h1>
        <div className="grid md:grid-cols-2">
          <div>
            <h2>Web Development Projects</h2>
            <ul>
              <li>
                1. Project Name: [Project 1] Description: Brief description of
                the project highlighting technologies used, challenges overcome,
                and outcomes achieved. Link: [Link to project/demo]
              </li>
              <li>
                2. Project Name: [Project 2] Description: Brief description of
                the project highlighting technologies used, challenges overcome,
                and outcomes achieved. Link: [Link to project/demo]
              </li>
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
      <div className="mt-10">
        <h1 className="Header">Skills</h1>
        <ul className="grid grid-cols-3">
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
      <div className="mt-10">
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
