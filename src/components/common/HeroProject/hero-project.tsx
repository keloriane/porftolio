"use client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import GridContainer from "../Container/container";
import Column from "../Col/col";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PortableText } from "next-sanity";
import Link from "next/link";
import styles from "./style.module.css";
import { twMerge } from "tailwind-merge";
import { Badge } from "@/components/Ui/badge";
import ParallaxImage from "../ImageParallax/image-parallax";
import { Project } from "@/type";

gsap.registerPlugin(ScrollTrigger);

const HeroProject: React.FC<{ projectItem: Project }> = ({ projectItem }) => {
  const refs = {
    heroContainer: useRef<HTMLDivElement>(null),
    heroImage: useRef<HTMLImageElement>(null),
    title: useRef<HTMLHeadingElement>(null),
    description: useRef<HTMLDivElement>(null),
    secondImage: useRef<HTMLImageElement>(null),
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const { heroContainer, heroImage, title, description, secondImage } =
        refs;

      // Parallax effects
      const parallaxElements = [
        { ref: heroImage, yPercent: 20 },
        { ref: title, yPercent: 10 },
        { ref: description, yPercent: -10 },
        { ref: secondImage, y: 100 },
      ];

      parallaxElements.forEach(({ ref, yPercent, y }) => {
        if (ref.current) {
          gsap.to(ref.current, {
            ...(yPercent ? { yPercent } : { y }),
            ease: "none",
            scrollTrigger: {
              trigger: heroContainer.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      });

      // Initial animations
      gsap.fromTo(
        heroImage.current,
        { opacity: 0, scale: 1.2 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
      );

      gsap.fromTo(
        [title.current, description.current],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  const renderTechBadges = () => (
    <div className="flex gap-[20px] flex-wrap items-center mt-[24px]">
      {projectItem.tech.map((tag, i) => (
        <Badge
          variant={"default"}
          className="text-[17px] text-light font-light flex items-center px-[10px] gap-[5px]"
          key={i}
        >
          <div></div>
          {tag && (
            <img
              src={urlFor(tag).url()}
              alt=""
              className={`${tag.alt === "Nextjs" || tag.alt === "Sanity" ? "h-[18px]" : "h-[20px]"}`}
            />
          )}
          {tag.alt !== "Nextjs" && tag.alt !== "Sanity" && tag.alt}
        </Badge>
      ))}
    </div>
  );

  return (
    <>
      <div
        className="w-screen h-screen flex bg-primary items-center overflow-hidden relative"
        ref={refs.heroContainer}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
        <Image
          src={urlFor(projectItem.previewSecond).url()}
          alt=""
          fill
          className="object-cover"
          ref={refs.heroImage}
        />
        <GridContainer columns={24} className="relative z-20 text-body">
          <Column colStart={3} colEnd={15} className="items-baseline">
            <h2 ref={refs.title} className="text-[6vw] capitalize">
              {projectItem.projectTitle}
            </h2>
          </Column>
          <Column colStart={16} colEnd={25} className="text-lg leading-[36px]">
            <div ref={refs.description}>
              <PortableText value={projectItem.body} />
              <Link
                href={projectItem.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                see website
              </Link>
            </div>
          </Column>
        </GridContainer>
      </div>
      <GridContainer columns={24} className="mt-[100px] relative z-10">
        <Column colStart={2} colEnd={24}>
          {/* <div className="h-[50vw] bg-white relative overflow-hidden">
            <Image
              src={urlFor(projectItem.previewSecond).url()}
              alt=""
              fill
              className="object-cover border-primary p-2"
              ref={refs.secondImage}
            />
          </div> */}
          <ParallaxImage
            src={urlFor(projectItem.previewSecond).url()}
            alt="Parallax Image 2"
            width={1200}
            height={800}
            containerHeight="h-[70vh]"
            damping={0.7}
          />
        </Column>
      </GridContainer>
      <GridContainer columns={24} className="py-[200px]">
        <Column colStart={2} colEnd={10}>
          <h2 className="text-6xl">Challenges:</h2>
        </Column>
        <Column
          colStart={12}
          colEnd={24}
          className={twMerge(styles.challengeContainer, "text-xl text-primary")}
        >
          <PortableText value={projectItem.challenge} />
        </Column>
      </GridContainer>
      <GridContainer columns={24} gap={24} className="mt-[100px]">
        <Column colStart={2} colEnd={13}>
          <div className="bg-[#D9D9D9] w-full h-[400px]" />
        </Column>
        <Column colStart={13} colEnd={24}>
          <div className="bg-[#D9D9D9] w-full h-[400px]" />
        </Column>
      </GridContainer>
      <GridContainer columns={24} className="py-[150px]">
        <Column colStart={2} colEnd={4}>
          <h2 className="text-6xl">Technologies:</h2>
        </Column>
        <Column colStart={7} colEnd={24}>
          {renderTechBadges()}
        </Column>
      </GridContainer>
      <GridContainer columns={24} className="py-[200px]">
        <Column colStart={2} colEnd={10}>
          <h2 className="text-6xl">What the client said:</h2>
        </Column>
        <Column
          colStart={12}
          colEnd={24}
          className={twMerge(styles.challengeContainer, "text-xl text-primary")}
        >
          <p>
            I was tasked with building an online portfolio for a professional
            photographer who had an extensive collection of high-quality images
            to showcase. The main challenge was organizing these images in a way
            that would not only look visually appealing but also ensure seamless
            navigation and user experience. To achieve this, I focused heavily
            on crafting the perfect sitemap and layout that allowed users to
            explore the gallery intuitively.
          </p>
        </Column>
      </GridContainer>
    </>
  );
};

export default HeroProject;
