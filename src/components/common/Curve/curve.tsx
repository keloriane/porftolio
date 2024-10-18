"use client";
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/router";
import {
  animateText,
  animateCurve,
  animateTranslate,
} from "@/lib/utils/animation"; // Import the GSAP animations

// Define the available routes and their labels
const routes: { [key: string]: string } = {
  "/": "Home",
  "/about": "About",
  "/contact": "Contact",
};

// TypeScript interface for dimension state
interface Dimensions {
  width: number | null;
  height: number | null;
}

// TypeScript interface for the component props
interface CurveProps {
  children: React.ReactNode;
  backgroundColor: string;
}

const Curve: React.FC<CurveProps> = ({ children, backgroundColor }) => {
  const router = useRouter();
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: null,
    height: null,
  });

  // Refs to access DOM elements for GSAP animations
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  // Handle resize to get dimensions
  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Trigger animations on load
  useEffect(() => {
    if (
      textRef.current &&
      svgRef.current &&
      pathRef.current &&
      dimensions.width &&
      dimensions.height
    ) {
      // Trigger text, curve, and translate animations
      animateText(textRef.current);
      animateCurve(pathRef.current, dimensions.width, dimensions.height);
      animateTranslate(svgRef.current);
    }
  }, [dimensions]);

  return (
    <div className="page curve" style={{ backgroundColor }}>
      <div
        style={{ opacity: dimensions.width == null ? 1 : 0 }}
        className="background"
      />
      <p ref={textRef} className="route">
        {routes[router.route]}
      </p>
      {dimensions.width != null && (
        <SVG width={dimensions.width} height={dimensions.height as number} />
      )}
      {children}
    </div>
  );
};

// TypeScript interface for SVG dimensions
interface SVGProps {
  width: number;
  height: number;
}

const SVG: React.FC<SVGProps> = ({ width, height }) => {
  const pathRef = useRef<SVGPathElement | null>(null);

  const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `;

  const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `;

  useEffect(() => {
    if (pathRef.current) {
      // Animate the path on mount
      gsap.to(pathRef.current, {
        attr: { d: targetPath },
        duration: 0.75,
        delay: 0.35,
        ease: "[0.76, 0, 0.24, 1]",
      });
    }
  }, [width, height, targetPath]);

  return (
    <svg width={width} height={height}>
      <path
        ref={pathRef}
        fill="none"
        stroke="black"
        strokeWidth="5"
        d={initialPath}
      />
    </svg>
  );
};

export default Curve;
