import { addClient } from "@/app/(Engine)/actions/addClient";
import PortfolioPage from "@/app/components/PortfolioPage";
import Client from "@/app/(Engine)/models/clientSchema";
import * as styles from "@/app/Styles/index.module.css";

export const metadata = {
  title: "Princewill Igwe Portfolio",
};

const portfolio = async () => {
  const inbox = await Client.find({ read: false }).count();

  console.log({ inbox });

  const projects = [
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
  ];
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

  const Socials = [
    {
      name: "Github",
      image: "/socials/Github.svg",
      black: "/socials/GithubtBlk.svg",
    },
    {
      name: "Instagram",
      image: "/socials/Instagram.svg",
      black: "/socials/InstagramtBlk.svg",
    },
    {
      name: "LinkedIn",
      image: "/socials/LinkedIn.svg",
      black: "/socials/LinkedInBlk.svg",
    },
    {
      name: "Pinterest",
      image: "/socials/Pinterest.svg",
      black: "/socials/PinterestBlk.svg",
    },
    {
      name: "Facebook",
      image: "/socials/Facebook.svg",
      black: "/socials/FacebookBlk.svg",
    },
  ];
  const skills = [
    { name: "HTML 5", image: "/tech/HTML5.svg", black: "/tech/HTML5Blk.svg" },
    { name: "CSS 3", image: "/tech/CSS3.svg", black: "/tech/CSS3Blk.svg" },
    {
      name: "Javascript",
      image: "/tech/Javascript.svg",
      black: "/tech/JavascriptBlk.svg",
    },
    { name: "React", image: "/tech/React.svg", black: "/tech/ReactBlk.svg" },
    {
      name: "NEXT js",
      image: "/tech/NEXTjs.svg",
      black: "/tech/NEXTjsBlk.svg",
    },
    {
      name: "Tailwind",
      image: "/tech/Tailwind.svg",
      black: "/tech/TailwindBlk.svg",
    },
    {
      name: "Bootstrap",
      image: "/tech/Bootstrap.svg",
      black: "/tech/BootstrapBlk.svg",
    },
    {
      name: "MongoDB",
      image: "/tech/MongoDB.svg",
      black: "/tech/MongoDBBlk.svg",
    },
    {
      name: "Typescript",
      image: "/tech/Typescript.svg",
      black: "/tech/TypescriptBlk.svg",
    },
    {
      name: "Node js",
      image: "/tech/Nodejs.svg",
      black: "/tech/NodejsBlk.svg",
    },
    { name: "Python", image: "/tech/Python.svg", black: "/tech/PythonBlk.svg" },
    {
      name: "VS Code",
      image: "/tech/VSCode.svg",
      black: "/tech/VSCodeBlk.svg",
    },
    { name: "Git", image: "/tech/Git.svg", black: "/tech/GitBlk.svg" },
    { name: "Github", image: "/tech/Github.svg", black: "/tech/GithubBlk.svg" },
    { name: "Docker", image: "/tech/Docker.svg", black: "/tech/DockerBlk.svg" },
  ];
  return (
    <div className="min-h-screen my-5 px-5 xxs:px-10 lg:px-28 text-white overflow-hidden">
      <PortfolioPage
        projects={projects}
        picture={picture}
        Socials={Socials}
        skills={skills}
        inbox={inbox}
        addClient={addClient}
        styles={styles}
      />
    </div>
  );
};

export default portfolio;
