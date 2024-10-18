import Menu from "@/components/common/Menu/menu";
import { getProjectPage } from "@/lib/query";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import React from "react";
import HeroProject from "@/components/common/HeroProject/hero-project";
import CustomCursor from "@/components/common/Cursor/cursor";

gsap.registerPlugin(ScrollTrigger);

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectPage(params.slug);
  const projectItem = project.projectList[0];

  return (
    <div>
      <CustomCursor />
      <HeroProject projectItem={projectItem} />
    </div>
  );
}
