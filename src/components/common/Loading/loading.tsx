"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import lottie from "lottie-web";
import { useLoading } from "@/context/LoadingContext"; // Import the context
import lottieAnimation from "@/../public/k-logo-anim.json"; // Import your Lottie animation

export default function Loading() {
  const loaderRef = useRef(null);
  const numberRef = useRef(null);
  const progressBarRef = useRef(null);
  const lottieRef = useRef(null); // Reference for the Lottie animation container
  const { setLoading } = useLoading(); // Get the setLoading function from context

  useEffect(() => {
    const loader = loaderRef.current;
    const number = numberRef.current;
    const progressBar: any = progressBarRef.current;
    const lottieContainer: any = lottieRef.current;

    // Load the Lottie animation
    const lottieInstance = lottie.loadAnimation({
      container: lottieContainer, // the DOM element to contain the animation
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: lottieAnimation, // the animation data
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setLoading(false); // Set loading to false when animation completes
      },
    });

    // GSAP animation timeline
    if (progressBar) {
      tl.to(number, {
        duration: 2,
        innerText: 100,
        snap: { innerText: 1 },
        ease: "power2.inOut",
      })
        .to(
          progressBar,
          {
            duration: 2,
            width: "100%",
            ease: "power2.inOut",
            onUpdate: () => {
              const progress =
                progressBar.offsetWidth / progressBar.parentElement.offsetWidth;
              lottieInstance.goToAndStop(
                progress * lottieInstance.totalFrames,
                true
              ); // Control Lottie progress
            },
          },
          "<"
        )
        .to(loader, {
          duration: 1,
          opacity: 0,
          ease: "power2.inOut",
        });
    }

    return () => {
      lottieInstance.destroy(); // Clean up the Lottie instance when the component unmounts
      tl.kill(); // Clean up the GSAP timeline when the component unmounts
    };
  }, [setLoading]);

  return (
    <div
      ref={loaderRef}
      className="fixed z-80 top-0 left-0 w-full h-screen bg-background flex flex-col items-center justify-center overflow-hidden bg-body"
      aria-label="Loading animation"
      style={{ zIndex: 1000 }}
    >
      {/* Lottie Animation Container */}
      <div
        ref={lottieRef}
        className="w-64 h-64 mb-8"
        aria-label="Lottie Animation"
      ></div>

      {/* <div className="text-2xl md:text-4xl lg:text-6xl font-mono mb-4 text-primary mt-[100px]">
        Loading(
        <span ref={numberRef} aria-live="polite">
          0
        </span>
        );
      </div> */}

      <div className="w-64 md:w-96 h-2 bg-secondary rounded-full overflow-hidden mt-[100px]">
        <div
          ref={progressBarRef}
          className="h-full w-0 bg-body rounded-full"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    </div>
  );
}
