"use client";

import React, { useEffect, useRef, useState } from "react";
import Sketch from "@/scene/scene";
import { urlFor } from "@/sanity/lib/image";
import { Project } from "@/type";
import Link from "next/link";
import Column from "@/components/common/Col/col";
import GridContainer from "@/components/common/Container/container";

const ProjectPageItem = ({ projects }: { projects: Project[] }) => {
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the WebGL container
  const sketchRef = useRef<Sketch | null>(null); // To store the Sketch instance
  const imagesRefs = useRef<(HTMLImageElement | null)[]>([]); // Store the image refs
  const [areImagesLoaded, setAreImagesLoaded] = useState(false); // To track if all images are loaded
  const [loadedImagesCount, setLoadedImagesCount] = useState(0); // Track the number of loaded images

  useEffect(() => {
    // Check if all images are loaded
    if (loadedImagesCount === projects.length) {
      setAreImagesLoaded(true);
    }
  }, [loadedImagesCount, projects.length]);

  useEffect(() => {
    // Only run this when images are loaded and the container is available

    window.scrollTo(0, 0);
    if (
      containerRef.current &&
      areImagesLoaded &&
      imagesRefs.current.length > 0
    ) {
      sketchRef.current = new Sketch({
        container: containerRef.current, // Pass the container
        images: imagesRefs.current as HTMLImageElement[], // Ensure all image elements are loaded
      });
    }

    return () => {
      if (sketchRef.current) {
        sketchRef.current = null; // Cleanup WebGL instance
      }
    };
  }, [areImagesLoaded]);

  const handleImageLoad = () => {
    setLoadedImagesCount((prev) => prev + 1); // Increment the loaded image count
  };

  return (
    <div className="pt-[250px] flex items-center justify-center w-screen">
      {/* WebGL scene container */}
      <div
        ref={containerRef}
        className="w-screen h-screen fixed -z-10 top-0 left-0"
      ></div>
      <GridContainer columns={23}>
        {projects.map((project: Project, index: number) => (
          <Column colStart={2} colEnd={23} key={project._key}>
            <div className="flex flex-col max-w-[1200px] mt-[100px]">
              <div>
                <h3 className="text-[40px] font-thin text-primary">
                  {project.projectTitle}
                </h3>
                <div className="h-[.4px] w-full border-black border-[.5px]"></div>
              </div>
              <div className="max-w-[1200px] w-full h-[800px] relative">
                {/* Using <img> instead of Next.js Image component */}
                <img
                  src={urlFor(project.previewSecond).url()}
                  alt={project.projectTitle}
                  className="object-cover opacity-0  w-full h-full"
                  ref={(el) => {
                    if (el) {
                      el.crossOrigin = "anonymous";
                      imagesRefs.current[index] = el;
                    }
                  }}
                  onLoad={handleImageLoad} // Track when image is loaded
                  onError={handleImageLoad} // Handle image loading errors
                />
              </div>
            </div>
          </Column>
        ))}
      </GridContainer>
    </div>
  );
};

export default ProjectPageItem;
