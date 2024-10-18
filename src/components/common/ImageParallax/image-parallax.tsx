"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Make sure to register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  containerHeight?: string;
  damping?: number;
  className?: string;
}

export default function ParallaxImage({
  src,
  alt,
  width,
  height,
  containerHeight = "h-[50vh]",
  damping = 0.5,
  className = "",
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const imageWrapper = imageWrapperRef.current;

    if (!container || !imageWrapper) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.to(container, {
      yPercent: 30 * damping,
      ease: "none",
    }).to(
      imageWrapper,
      {
        yPercent: -30 * damping,
        ease: "none",
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, [damping]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${containerHeight} ${className}`}
    >
      <div ref={imageWrapperRef} className="w-full h-[120%] relative">
        <Image src={src} alt={alt} className="object-cover" fill priority />
      </div>
    </div>
  );
}
