"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useSlugContext } from "@/context/SlugContext";
import { throttle } from "lodash";

interface ProjectImage {
  slug: {
    current: string;
  };
  image: any;
}

export default function CustomCursor({
  projectImage,
}: {
  projectImage?: ProjectImage[];
}) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const inneCursorRef = useRef<HTMLDivElement>(null);
  const { activeSlug } = useSlugContext();

  const cursorTextRef = useRef<HTMLDivElement>(null);

  const activeProjectImage =
    projectImage && projectImage.find((p) => p.slug.current === activeSlug);

  useEffect(() => {
    const cursor = cursorRef.current;
    const iCursor = inneCursorRef.current;
    const cursorText = cursorTextRef.current;

    if (!cursor || !cursorText || !iCursor) return;

    const onMouseMove = throttle((e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        delay: 0.2,
      });
      gsap.to(iCursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out",
      });
    }, 16);

    const onMouseEnterLink = (e: Event) => {
      const target = e.target as HTMLElement;
      const hrefSlug = target.getAttribute("href")?.split("/").pop();

      const isProjectLink =
        projectImage && projectImage.some((p) => p.slug.current === hrefSlug);

      gsap.to(cursor, {
        scale: isProjectLink ? 5 : 2,
        duration: 0.3,
      });

      gsap.to(cursorText, {
        opacity: isProjectLink ? 0 : 1,
        duration: 0.3,
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
      });

      gsap.to(cursorText, {
        opacity: 0,
        duration: 0.3,
      });
    };

    document.addEventListener("mousemove", onMouseMove);

    const links = document.querySelectorAll("a, button");
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, [projectImage]);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-[30px] h-[30px] p-2 bg-primary rounded-full pointer-events-none z-[6000000] flex items-center justify-center overflow-hidden"
        style={{
          left: 0,
          top: 0,
          backgroundSize: "cover",
          transformOrigin: "center",
        }}
      >
        <p
          ref={cursorTextRef}
          className="text-[7px] font-semibold text-body opacity-0"
          style={{
            transform: "none",
          }}
        >
          Click
        </p>

        {activeProjectImage && (
          <Image
            src={urlFor(activeProjectImage.image).url()}
            alt=""
            fill
            className="object-cover"
          />
        )}
      </div>
      <div
        ref={inneCursorRef}
        className="bg-accent w-[15px] h-[15px] fixed z-[6000001] rounded-full pointer-events-none flex items-center justify-center"
        style={{
          left: 0,
          top: 0,
        }}
      ></div>
    </>
  );
}
