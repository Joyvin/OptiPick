import React from "react";
import ProjectCard from "../sub/ProjectCard";

const Projects = () => {
  return (
    <div
      className="w-[90%] mx-auto flex flex-col items-center justify-center pb-10"
      id="projects"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        Our Features
      </h1>
      <div className="h-full w-full grid md:grid-cols-3 md:flex-row gap-10 px-10">
        <ProjectCard
          src="/compare.png"
          title="Compare Products"
          description="Compare products to find the best Products to Buy."
        />
        <ProjectCard
          src="/chatbot.png"
          title="AI Chatbot"
          description="Have any doubts, want to find the best of Products for any scenario"
        />
        <ProjectCard
          src="/checker.png"
          title="Product Checker"
          description="Check for genuinity of products directly from the consumers"
        />
      </div>
    </div>
  );
};

export default Projects;