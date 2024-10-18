"use client";
import React, { useEffect, useRef, ElementType } from "react";
import { gsap } from "gsap";
import { twMerge } from "tailwind-merge";

type SplitType = "word" | "letter" | "line";

interface TextAnimationProps {
  text: string;
  splitType: SplitType;
  as?: ElementType;
  className?: string;
}

const TextAnimation: React.FC<TextAnimationProps> = ({
  text,
  splitType,
  as: Tag = "h2", // Default to h2 if no tag is provided
  className,
}) => {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = textRef.current;

    if (element?.textContent) {
      let splitText: string[] = [];

      switch (splitType) {
        case "word":
          splitText = element.textContent.split(" ");
          element.innerHTML = splitText
            .map(
              (word) =>
                `<span class="overflow-hidden inline-block"><span class="inline-block">${word}</span></span>`
            )
            .join(" ");
          break;

        case "letter":
          splitText = element.textContent.split("");
          element.innerHTML = splitText
            .map(
              (letter) =>
                `<span class="overflow-hidden inline-block"><span class="inline-block">${letter}</span></span>`
            )
            .join("");
          break;

        case "line":
          splitText = element.textContent.split("\n");
          element.innerHTML = splitText
            .map(
              (line) =>
                `<span class="block overflow-hidden"><span class="inline-block">${line}</span></span>`
            )
            .join("");
          break;
      }

      const spans = element.querySelectorAll("span > span");

      gsap.set(spans, { opacity: 0 });

      gsap.fromTo(
        spans,
        {
          y: 50,
        },
        {
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          delay: 0.5,
          y: 0,
          ease: "power3.out",
        }
      );
    }
  }, [splitType]);

  return (
    <Tag ref={textRef} className={twMerge("text-animation", className)}>
      {text}
    </Tag>
  );
};

export default TextAnimation;
