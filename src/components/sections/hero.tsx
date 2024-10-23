"use client";

import React, { useEffect, useRef } from "react";
import Profile from "@/../public/profile.png";
import Image from "next/image";
import { gsap } from "gsap";

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = titleRef.current;

    if (element) {
      // Get the innerHTML and split by <br /> tags
      const lines = element.innerHTML.split("<br>");
      // Replace the innerHTML with the new structure, wrapping each line in a div
      element.innerHTML = lines
        .map(
          (line) =>
            `<div class="overflow-hidden"><span class="inline-block">${line}</span></div>`
        )
        .join("");

      // Select all the inner spans (which now represent each line)
      const spans = element.querySelectorAll("span");

      // Set initial state for animation
      gsap.set(spans, { y: 100, opacity: 0 });

      // Animate each line on the y position with stagger
      gsap.to(spans, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.5,
      });
    }
  }, []);

  return (
    <section className="h-[100vh] flex items-center justify-between px-10">
      <div className="flex items-center w-full justify-between max-w-[1280px] m-auto ">
        {/* Left Section (Text) */}
        <div id="title" className="text-grey">
          <h2
            className="text-[38px] md:text-[68px] lg:text-[80px] font-light leading-tight font-primary"
            ref={titleRef}
          >
            Creative Developer <br />
            <span className="text-[#989898]"> currently based in</span> <br />
            Brussels
          </h2>
        </div>

        {/* Right Section (Image) */}
        <div className="relative h-[340px] w-[340px] justify-center lg:flex sm:hidden md:hidden hidden  ">
          <Image
            id="image"
            src={Profile.src}
            alt="Placeholder Image"
            className="object-cover"
            fill
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
