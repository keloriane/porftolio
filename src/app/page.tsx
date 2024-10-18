import Hero from "../components/sections/hero";
import Menu from "../components/common/Menu/menu";
import About from "../components/sections/about";
import Projects from "../components/sections/Projects/projects";
import Expertises from "@/components/sections/Expertises/expertises";
import Testimonials from "@/components/sections/Testimonials/testimonials";
import Footer from "@/components/sections/Footer/footer";
import CustomCursor from "@/components/common/Cursor/cursor";
import { getProjects, getProjectsImage } from "@/lib/query";

export default async function Home() {
  const projectImages = await getProjectsImage();

  return (
    <main className="relative bg-body">
      <CustomCursor projectImage={projectImages.projectList} />
      <Menu />
      <Hero />
      <About />
      <Projects />
      <Expertises />
      <Testimonials />
      <Footer />
    </main>
  );
}
