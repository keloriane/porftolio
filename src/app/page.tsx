import Hero from "../components/sections/hero";
import Menu from "../components/common/Menu/menu";
import About from "../components/sections/about";
import Projects from "../components/sections/Projects/projects";
import Expertises from "@/components/sections/Expertises/expertises";
import Testimonials from "@/components/sections/Testimonials/testimonials";
import Footer from "@/components/sections/Footer/footer";
import CustomCursor from "@/components/common/Cursor/cursor";
import { getProjectsImage } from "@/lib/query";
import GridContainer from "@/components/common/Container/container";
import Column from "@/components/common/Col/col";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";

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
      <GridContainer columns={24}>
        <Column colStart={2} colEnd={22}>
          <div
            className="flex flex-col max-w-[800px]"
            style={{
              margin: "150px auto",
            }}
          >
            <div className="flex">
              <h2 className="text-6xl font-semibold">{`Let\'s Work Together`}</h2>
            </div>

            <div className="mt-10">
              <p>
                {`I\'m always excited to take on new challenges and collaborate on
                creative projects. Whether you\'re looking for a complete website
                overhaul, a new e-commerce platform, or enhancing your current
                site\'s design and performance, I can help bring your vision to
                life. Feel free to reach out for collaboration opportunities, or if
                you\'d just like to chat about a new project!`}
              </p>
            </div>
          </div>
        </Column>
      </GridContainer>
      <Analytics />
      <GoogleAnalytics />
      <Footer />
    </main>
  );
}
