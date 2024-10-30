import { getProjects, getProjectsImage } from "@/lib/query";
import Column from "@/components/common/Col/col";
import GridContainer from "@/components/common/Container/container";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ProjectPageItem from "@/components/sections/ProjectPage/project-page-item";
import ProjectItem from "@/components/sections/Projects/ProjectList";
import Footer from "@/components/sections/Footer/footer";
import CustomCursor from "@/components/common/Cursor/cursor";

export default async function ProjectPage() {
  const projectData = await getProjects();
  const projects = projectData[0].projectList;
  const projectImages = await getProjectsImage();

  return (
    <div className="relative">
      {/* <ProjectPageItem projects={projects} /> */}

      <CustomCursor projectImage={projectImages.projectList} />

      <GridContainer columns={24} className="py-[200px]">
        <Column colStart={2} colEnd={10}>
          <h1 className="text-6xl uppercase py-[100px] font-semibold">
            Works:
          </h1>
        </Column>
        {projects.map((project, i) => (
          <ProjectItem project={project} key={project._key} i={i} />
        ))}
      </GridContainer>
      <Footer />
    </div>
  );
}
