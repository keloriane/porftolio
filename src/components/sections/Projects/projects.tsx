import { getProjects } from "@/lib/query";
import React from "react";
import GridContainer from "../../common/Container/container";
import "swiper/css";
import "swiper/css/navigation"; // Import Swiper CSS
import ProjectItem from "./ProjectList";
import Column from "@/components/common/Col/col";

const Projects = async () => {
  const projects = await getProjects();

  return (
    <section id={"projects"} className="mt-[250px] relative">
      <GridContainer columns={24}>
        <Column colStart={2} colEnd={8}>
          <h2 className="text-6xl py-[100px] font-semibold">
            Latest projects:
          </h2>
        </Column>
      </GridContainer>
      <GridContainer columns={24}>
        {projects[0].projectList.map((project, i) => (
          <ProjectItem project={project} key={project._key} i={i} />
        ))}
      </GridContainer>
    </section>
  );
};

export default Projects;
