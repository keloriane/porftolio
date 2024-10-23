"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { useLoading } from "@/context/LoadingContext";
import Loading from "@/components/common/Loading/loading";
import Lenis from "lenis";
import CustomCursor from "@/components/common/Cursor/cursor";

export default function Template({ children }: { children: React.ReactNode }) {
  const { isLoading } = useLoading();

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    function animatePagein() {
      const el = document.querySelector(".content-anim");
      if (el) {
        gsap.set(el, { opacity: 0 });

        gsap.to(el, {
          duration: 1,
          opacity: 1,
        });
      }
    }
    animatePagein();
  });

  return (
    // <div className="content-anim">{isLoading ? <Loading /> : children}</div>
    <div className="content-anim">{children}</div>
  );
}
