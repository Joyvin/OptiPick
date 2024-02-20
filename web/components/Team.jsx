import React from "react";
import { Github, Instagram, Linkedin } from "lucide-react";

const Team = () => {
  const data = [
    {
      img: "img/joy.jpeg",
      name: "Joyvin Mendonca",
      role: "Full Stack dev",
      inst: "https://www.instagram.com/joyvinmendonca/",
      git: "https://github.com/Joyvin",
      lkdn: "https://www.linkedin.com/in/joyvinmendonca/",
      web: 'https://joyme.vercel.app'
    },
    {
      img: "img/alvin.jpg",
      name: "Alvin Dsouza",
      role: "Front End dev",
      inst: "https://www.instagram.com/the.alvin.dsouza",
      git: "https://github.com/AlvinDHacker",
      lkdn: "https://www.linkedin.com/in/alvin-dsouza-a23268263/",
      web: '#'
    },
    {
      img: "img/jayden.png",
      name: "Alston Soares",
      role: "Back End dev",
      inst: "https://www.instagram.com/jaydencolaco",
      git: "https://github.com/jaydencolaco",
      lkdn: "https://www.linkedin.com/in/jayden-colaco-730637264/",
      web: '#'
    },
    {
      img: "img/zane.jpg",
      name: "Zane Fernandes",
      role: "AI / ML dev",
      inst: "https://www.instagram.com/zane_fernandes/",
      git: "https://github.com/ZaneFerns360/",
      lkdn: "https://www.linkedin.com/in/zane-fernandes-b46b75264/",
      web: '#'
    },
  ];

  return (
    <div id="team" className="mt-10">
      <h1 className="mb-4 text-[38px] tracking-tight font-bold text-center text-gray-900 dark:text-white">
        Meet the <span className="text-[#2CC5B2]">Team</span>
      </h1>
      <div className="my-7 mx-auto grid md:grid-cols-4 md:w-[65%]">
        {data.map((values, i) => (
          <div className="">
          <div className="w-full max-w-sm bg-white rounded-lg  dark:bg-transparent">
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={values.img}
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {values.name}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {values.role}
              </span>
              <div className="flex mt-4 space-x-3 md:mt-6">
                <a href={values.inst}>
                  <Instagram />
                </a>
                <a href={values.git}>
                  <Github />
                </a>
                <a href={values.lkdn}>
                  <Linkedin />
                </a>
    
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
