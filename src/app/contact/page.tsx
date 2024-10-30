import CustomCursor from "@/components/common/Cursor/cursor";
import ContactForm from "@/components/sections/contact";
import { getProjectsImage } from "@/lib/query";
import React from "react";

export default async function ContactPage() {
  const projectImages = await getProjectsImage();
  return (
    <div>
      <CustomCursor projectImage={projectImages.projectList} />
      <ContactForm />
    </div>
  );
}
