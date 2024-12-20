"use client";

import { urlFor } from "@/sanity/lib/image";
import { Project } from "@/type/";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import { Badge } from "@/components/Ui/badge";
import Column from "@/components/common/Col/col";
import { useSlugContext } from "@/context/SlugContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ProjectItem({
  project,
  i,
}: {
  project: Project;
  i: number;
}) {
  const linkRef = useRef<HTMLDivElement>(null);
  const layerP = useRef<HTMLDivElement>(null);
  const projectTitleRef = useRef<HTMLHeadingElement>(null);
  const numberRef = useRef<HTMLHeadingElement>(null);
  const linesBorder = useRef<HTMLDivElement>(null);

  const { setActiveSlug } = useSlugContext();

  useEffect(() => {
    const link = linkRef.current;
    const projectTitle = projectTitleRef.current;
    const layer = layerP.current;
    const number = numberRef.current;
    const lines = linesBorder.current;
    if (!link || !projectTitle || !layer || !number || !lines) return;

    // Create the GSAP timeline
    const projectTl = gsap.timeline({ paused: true });

    projectTl
      .to(
        layer,
        {
          opacity: 1, // Slide the black layer from right to left
          duration: 0.5,
          ease: "power3.out",
        },
        "start"
      )
      .to(
        projectTitleRef.current,
        {
          opacity: 1, // Slide the black layer from right to left
          duration: 0.15,
          ease: "power3.out",
          color: "black",
        },
        "start"
      );

    const handleMouseEnter = () => {
      setActiveSlug(project.slug.current); // Set active slug on hover
      projectTl.play();
    };

    const handleMouseLeave = () => {
      setActiveSlug(null); // Reset slug on mouse leave
      projectTl.reverse();
    };

    link.addEventListener("mouseenter", handleMouseEnter);
    link.addEventListener("mouseleave", handleMouseLeave);

    // Animate the border lines when in view
    gsap.fromTo(
      lines,
      { width: 0, opacity: 0 },
      {
        width: "100%",
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: link, // Trigger the animation when the project item comes into view
          start: "top 80%", // Adjust based on when you want the animation to trigger
          end: "top 40%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      link.removeEventListener("mouseenter", handleMouseEnter);
      link.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [project.slug.current, setActiveSlug]);

  return (
    <Column
      colStart={2}
      colEnd={21}
      className="relative text-primary overflow-hidden"
    >
      <div
        className="top-0 left-0 absolute  opacity-0 w-full h-full z-9"
        ref={layerP}
        style={{
          right: "100%", // Start with the black background hidden
          top: 0,
        }}
      ></div>

      {/* Border line animation */}
      <div ref={linesBorder} className="w-full h-[1px] bg-primary"></div>

      <div key={project.projectTitle} className=" relative z-10" ref={linkRef}>
        <Link
          href={`${project.slug.current === "nicolas-frank" ? "#" : project.projectUrl}`}
          className="flex justify-between h-full py-4"
          target="blank"
        >
          <div className="flex flex-col justify-center">
            <div className="md:text-[30px] text-[30px] font-semibold w-full flex justify-between">
              {/* The project title */}
              <h2
                className="relative"
                ref={projectTitleRef}
                style={{
                  color: "#858585", // Initially black
                  transition: "color 0.3s ease",
                }}
              >
                {project.projectTitle}
              </h2>
            </div>
            <div>
              <h4>{project.intro ? project.intro : ""}</h4>
            </div>
            <div className="flex gap-4 mt-[24px] flex-wrap">
              {project.tech.map((tag: any) => (
                <Badge
                  key={tag.alt}
                  variant={"default"}
                  className="text-[10px] text-light font-light flex items-center px-[10px] gap-[5px] border-none ml-2"
                >
                  {tag && (
                    <img
                      src={urlFor(tag).url()}
                      alt=""
                      className={`${
                        tag.alt === "Nextjs" ? "h-[10px]" : "h-[14px]"
                      } ${tag.alt === "Sanity" ? "h-[10px]" : "h-[14px]"}`}
                    />
                  )}
                  <p>
                    {tag.alt === "Nextjs" || tag.alt === "Sanity"
                      ? ""
                      : tag.alt}
                  </p>
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center md:text-[65px] text-[45px] justify-center">
            <h4 ref={numberRef} className="relative flex ">
              {i}
            </h4>
          </div>
        </Link>
      </div>
    </Column>
  );
}
