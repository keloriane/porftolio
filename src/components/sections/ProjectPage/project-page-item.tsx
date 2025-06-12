"use client";

import React, { useEffect, useRef, useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import { Project } from "@/type";
import Link from "next/link";
import { Badge } from "@/components/Ui/badge";

export default function BentoGridProjects({
  projects,
}: {
  projects: Project[];
}) {
  const imagesRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  useEffect(() => {
    if (loadedImagesCount === projects.length) {
      setAreImagesLoaded(true);
    }
  }, [loadedImagesCount, projects.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageLoad = () => {
    setLoadedImagesCount((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 pt-[100px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-screen">
        {projects.map((project: Project, index: number) => {
          const isLarge = index % 7 === 0; // More sparse large items
          const isWide = index % 4 === 1; // Widens every fourth item except large ones
          const isLastItem = index === projects.length - 1; // Identify last item

          return (
            <Link
              key={project.slug.current}
              href={`/projects/${project.slug.current}`}
              className={`group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-2xl ${
                isLarge
                  ? "md:col-span-2 md:row-span-2"
                  : isWide
                    ? "md:col-span-1"
                    : ""
              } ${isLastItem ? "lg:col-end-4 lg:col-start-1 h-[320px]" : ""}`}
            >
              {/* Dark overlay with gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
              {/* Project Image */}

              <img
                src={urlFor(project.previewSecond).url()}
                alt={project.projectTitle}
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                  isLarge ? "aspect-square" : "aspect-video"
                }`}
                ref={(el) => {
                  if (el) {
                    el.crossOrigin = "anonymous";
                    imagesRefs.current[index] = el;
                  }
                }}
                onLoad={handleImageLoad}
                onError={handleImageLoad}
              />
              {/* Project Details on Hover */}
              <div className="absolute inset-0 p-6  flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex justify-between">
                  <h3 className="text-4xl font-semibold text-white mb-2">
                    {project.projectTitle}
                  </h3>
                  <div className="flex flex-wrap gap-2 items-center ">
                    {project.tech.slice(0, 3).map((tag: any) => (
                      <Badge
                        key={tag.alt}
                        variant="secondary"
                        className={`text-xs font-light flex items-center bg-white max-h-[20px] backdrop-blur-md rounded-full`}
                      >
                        {tag && (
                          <img
                            src={urlFor(tag).url()}
                            alt={tag.alt}
                            className={`object-contain ${
                              tag.alt === "Nextjs" ? "h-[17px]" : "h-[20px]"
                            } ${tag.alt === "Sanity" ? "h-[17px]" : "h-[20px]"}`}
                          />
                        )}
                        {tag.alt !== "Nextjs" &&
                          tag.alt !== "Sanity" &&
                          tag.alt}
                      </Badge>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-white backdrop-blur-md rounded-full max-h-[30px]"
                      >
                        +{project.tech.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
