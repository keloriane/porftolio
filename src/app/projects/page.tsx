import { getProjects } from "@/lib/query";
import Column from "@/components/common/Col/col";
import GridContainer from "@/components/common/Container/container";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ProjectPageItem from "@/components/sections/ProjectPage/project-page-item";

export default async function ProjectPage() {
  const projectData = await getProjects();
  const projects = projectData[0].projectList;

  return (
    <div className="relative">
      <ProjectPageItem projects={projects} />
    </div>
  );
}
