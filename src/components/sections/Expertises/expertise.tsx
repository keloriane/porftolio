"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger
import Column from "@/components/common/Col/col";
import GridContainer from "@/components/common/Container/container";
import { Badge } from "@/components/Ui/badge";
import { urlFor } from "@/sanity/lib/image";
import { Expertise } from "@/type";
import { PortableText } from "next-sanity";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ExpertiseItemSection = ({ expertises }: { expertises: Expertise[] }) => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const expContainer = useRef<HTMLDivElement>(null);

  const isTabletView = () => window.innerWidth < 768; // Define the tablet breakpoint

  const animateItem = (index: number, isEntering: boolean) => {
    if (isTabletView()) return; // Disable animations for tablets

    const item = itemRefs.current[index];
    if (!item) return;

    const line = item.querySelector(".animated-line");
    const content = item.querySelector(".animated-content");
    const tagsContent = item.querySelector(".tag-container");

    gsap.to(line, {
      width: isEntering ? "100%" : "0%",
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(content, {
      height: isEntering ? "auto" : "0",
      opacity: isEntering ? 1 : 0,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(tagsContent, {
      marginTop: isEntering ? "24px" : "-40px",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      className="mt-[150px] h-[520px] flex items-center flex-col"
      ref={expContainer}
    >
      {expertises.map((exp, i) => (
        <div
          key={i}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className="group cursor-pointer"
          onMouseEnter={() => animateItem(i, true)}
          onMouseLeave={() => animateItem(i, false)}
        >
          <GridContainer
            columns={24}
            gap={"20px"}
            className="w-[90%] max-w-[1280px] m-auto relative border-primary border-t-[0.5px] py-[50px]"
          >
            <div className="animated-line z-10 absolute -top-[1px] left-0 w-0 h-[2px] bg-accent border-[1px]"></div>
            <Column
              colStart={[1, 1, 1, 1]}
              colEnd={[16, 16, 9, 9]}
              className=""
            >
              <div>
                <h4 className="text-10xl font-primary text-4xl font-black">
                  {exp.expertiseTitle}
                </h4>
              </div>
            </Column>
            <Column
              colStart={[1, 1, 9, 9]}
              colEnd={[25, 25, 25, 25]}
              className="animated-content h-0 opacity-0 overflow-hidden"
            >
              <div
                className="leading-8 text-xl text-gray-700"
                style={{
                  listStyle: "disc",
                }}
              >
                <PortableText value={exp.expertisesDescription} />
              </div>
            </Column>

            <Column
              colStart={[1, 1, 9, 9]}
              colEnd={[25, 25, 25, 25]}
              className="flex gap-[24px] flex-wrap md:-mt-[40px] mt-[80px] tag-container"
            >
              {exp.tags.map((tag) => (
                <Badge
                  variant={"default"}
                  className="text-[17px] text-light font-light flex items-center px-[10px] gap-[5px]"
                  key={tag.tagTitle}
                >
                  <div></div>
                  {tag.tagImage && (
                    <img
                      src={urlFor(tag.tagImage).url()}
                      alt=""
                      className={`${
                        tag.tagTitle === "Nextjs" ? "h-[14px]" : "h-[20px]"
                      } `}
                    />
                  )}
                  <p>{tag.tagTitle !== "Nextjs" && tag.tagTitle}</p>
                </Badge>
              ))}
            </Column>
          </GridContainer>
        </div>
      ))}
    </div>
  );
};

export default ExpertiseItemSection;
