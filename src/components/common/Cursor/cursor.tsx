"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useSlugContext } from "@/context/SlugContext";
import { throttle } from "lodash"; // You can also implement your own throttle

interface ProjectImage {
  slug: {
    current: string;
  };
  image: any; // Adjust type if you have a more specific type for the image
}

export default function CustomCursor({
  projectImage,
}: {
  projectImage?: ProjectImage[];
}) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const inneCursorRef = useRef<HTMLDivElement>(null);
  const { activeSlug } = useSlugContext(); // Get the active slug from the context

  const cursorTextRef = useRef<HTMLDivElement>(null);

  // Filter the project image array to find the one with the matching activeSlug

  const activeProjectImage =
    projectImage && projectImage.find((p) => p.slug.current === activeSlug);

  useEffect(() => {
    const cursor = cursorRef.current;
    const iCursor = inneCursorRef.current;
    const cursorText = cursorTextRef.current;

    if (!cursor || !cursorText || !iCursor) return;

    // Throttled mouse move function
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
    }, 16); // Throttled to run every 16ms (~60FPS)

    const onMouseEnterLink = (e: Event) => {
      const target = e.target as HTMLElement;
      const hrefSlug = target.getAttribute("href")?.split("/").pop(); // Assuming slugs are at the end of the URL

      // Check if the hovered link's slug matches any project image slug
      const isProjectLink =
        projectImage && projectImage.some((p) => p.slug.current === hrefSlug);

      // Scale only the cursor container, not the text
      gsap.to(cursor, {
        scale: isProjectLink ? 5 : 2, // Scale to 5 if it's a project link, otherwise scale to 2
        duration: 0.3,
      });

      // Show "Click" text only for regular links (no scaling for the text)
      gsap.to(cursorText, {
        opacity: isProjectLink ? 0 : 1, // Hide for project links, show for regular links
        duration: 0.3,
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, {
        scale: 1, // Reset scale on mouse leave for container
        duration: 0.3,
      });

      gsap.to(cursorText, {
        opacity: 0, // Always hide the text on mouse leave
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
        className="fixed w-[30px] h-[30px] p-2 bg-primary border-[.5px] border-white rounded-full pointer-events-none z-[6000000] flex items-center justify-center overflow-hidden"
        style={{
          left: 0,
          top: 0,
          backgroundSize: "cover",
          transformOrigin: "center", // Ensure scaling occurs from the center
        }}
      >
        {/* Display "Click" text only when hovering over regular links */}
        <p
          ref={cursorTextRef}
          className="text-[7px] font-semibold text-body opacity-0"
          style={{
            transform: "none", // Prevent scaling on the text itself
          }}
        >
          Click
        </p>

        {/* Display the active project image if available */}
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
