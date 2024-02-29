import React from "react";

const portfolio = () => {
  return (
    <div className="min-h-screen my-5 px-10 md:px-28">
      <div className="">
        <h1 className="text-green-500 text-2xl">About Me</h1>
        <h2>Meet Princewill Igwe</h2>
        <p>
          I am a seasoned professional with expertise in both front-end and
          back-end development, coupled with a keen eye for graphic and motion
          design. With a strong foundation in computer science and design
          principles, I strive to deliver solutions that are not only functional
          but also visually compelling.
        </p>
      </div>
      <div>
        <h1 className="text-green-500 text-2xl">Portfolio</h1>
        <div>
          <h2>Web Development Projects</h2>
          <ul>
            <li>
              1. Project Name: [Project 1] Description: Brief description of the
              project highlighting technologies used, challenges overcome, and
              outcomes achieved. Link: [Link to project/demo]
            </li>
            <li>
              2. Project Name: [Project 2] Description: Brief description of the
              project highlighting technologies used, challenges overcome, and
              outcomes achieved. Link: [Link to project/demo]
            </li>
          </ul>
        </div>
        <div>
          <h2>Graphic Design Projects</h2>
          <ul>
            <li>
              1. Project Name: [Project 1] Description: Brief description of the
              project showcasing design objectives, creative process, and final
              deliverables. Link: [Link to project/images]
            </li>
            <li>
              2. Project Name: [Project 2] Description: Brief description of the
              project showcasing design objectives, creative process, and final
              deliverables. Link: [Link to project/images]
            </li>
          </ul>
        </div>
        <div>
          <h2>Motion Design Projects</h2>
          <ul>
            <li>
              1. Project Name: [Project 1] Description: Brief description of the
              project showcasing animation techniques, creative concepts, and
              final results. Link: [Link to project/video]
            </li>
            <li>
              2. Project Name: [Project 2] Description: Brief description of the
              project showcasing animation techniques, creative concepts, and
              final results. Link: [Link to project/video]
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h1 className="text-green-500 text-2xl">Skills</h1>
        <ul>
          <li>
            <h3>Web Development: </h3>
            <ul>
              <li>Front-end: HTML, CSS, JavaScript, React.js, Vue.js</li>
              <li>Back-end: Node.js, Express.js, RESTful APIs</li>
              <li>Databases: MongoDB, MySQL, PostgreSQL</li>
              <li>Version Control: Git, GitHub</li>
              <li>Deployment: Heroku, Netlify, AWS</li>
            </ul>
          </li>
          <li>Graphic Design: Adobe Photoshop, Illustrator, InDesign</li>
          <li>Ui/Ux: Figma, Adobe XD</li>
          <li>Motion Design: Adobe After Effects, Premiere Pro, Blender</li>
        </ul>
      </div>
      <div>
        <h1 className="text-green-500 text-2xl">Contact</h1>
        <p>
          Ready to collaborate or have a project in mind? Feel free to reach out
          to me through the contact form or connect with me on social media.
        </p>
      </div>
    </div>
  );
};

export default portfolio;
