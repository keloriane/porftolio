import { getProjects } from "@/lib/query";
import React from "react";
import GridContainer from "../../common/Container/container";
import "swiper/css";
import "swiper/css/navigation"; // Import Swiper CSS
import ProjectItem from "./ProjectList";

const Projects = async () => {
  const projects = await getProjects();

  return (
    <section id={"projects"} className="mt-[250px] relative">
      <GridContainer columns={24}>
        {projects[0].projectList.map((project) => (
          <ProjectItem project={project} key={project._key} />
        ))}
      </GridContainer>
    </section>
  );
};

export default Projects;
