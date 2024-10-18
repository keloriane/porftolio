"use client";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const curve = curveRef.current;

    if (!footer || !curve) return;

    gsap.to(curve, {
      top: "-80%",
      ease: "power2.out",

      scrollTrigger: {
        trigger: footer,
        start: "50% bottom",
        end: "bottom bottom",
        scrub: 5,
      },
    });
    gsap.to(curve, {
      borderRadius: "0%",
      ease: "power2.out",

      scrollTrigger: {
        trigger: footer,
        start: "50% bottom",
        end: "bottom bottom",
        scrub: 1,
      },
    });
  }, []);

  return (
    <footer
      className="w-full h-[500px] bg-primary text-body relative overflow-hidden flex items-center justify-center mt-[150px]"
      ref={footerRef}
    >
      <div
        className="w-[150%] bg-body h-[400px] absolute -left-1/4 -top-[30%]"
        style={{
          borderRadius: "100%",
        }}
        ref={curveRef}
      ></div>
      <Link href={"/contact"} className="text-6xl">
        Get in touch
      </Link>
    </footer>
  );
};

export default Footer;
