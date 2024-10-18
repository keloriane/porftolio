"use client";

import { urlFor } from "@/sanity/lib/image";
import { Project } from "@/type/";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import { Badge } from "@/components/Ui/badge";
import Column from "@/components/common/Col/col";
import { useSlugContext } from "@/context/SlugContext";

export default function ProjectItem({ project }: { project: Project }) {
  const linkRef = useRef<HTMLDivElement>(null);
  const { setActiveSlug } = useSlugContext();

  useEffect(() => {
    const link = linkRef.current;
    if (!link) return;

    const handleMouseEnter = () => {
      setActiveSlug(project.slug.current); // Set active slug on hover
    };

    const handleMouseLeave = () => {
      setActiveSlug(null); // Reset slug on mouse leave
    };

    link.addEventListener("mouseenter", handleMouseEnter);
    link.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      link.removeEventListener("mouseenter", handleMouseEnter);
      link.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [project.slug.current, setActiveSlug]);

  return (
    <Column colStart={2} colEnd={21}>
      <div
        key={project.slug.current}
        className="border-t border-primary"
        ref={linkRef}
      >
        <Link
          href={`/projects/${project.slug.current}`}
          className="flex justify-between h-hull py-10"
        >
          <div className="flex flex-col justify-center">
            <div className="md:text-[85px] text-[45px]">
              {project.projectTitle}
            </div>
            <div className="flex gap-4 mt-[24px] flex-wrap">
              {project.tech.map((tag: any) => (
                <Badge
                  key={tag.alt}
                  variant={"default"}
                  className="text-[17px] text-light font-light flex items-center px-[10px] gap-[5px] bg-green-200 border-none "
                >
                  {tag && (
                    <img
                      src={urlFor(tag).url()}
                      alt=""
                      className={`${
                        tag.alt === "Nextjs" ? "h-[10px]" : "h-[20px]"
                      } ${tag.alt === "Sanity" ? "h-[10px]" : "h-[20px]"}`}
                    />
                  )}
                  {tag.alt === "Nextjs" || tag.alt === "Sanity" ? "" : tag.alt}
                </Badge>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </Column>
  );
}
