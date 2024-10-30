import React from "react";
import GridContainer from "../common/Container/container";
import Column from "../common/Col/col";

const About = () => {
  return (
    <div>
      <GridContainer columns={24} gap={"[24px]"}>
        <Column colStart={[2, 2, 2, 2]} colEnd={[18, 24, 10, 10]}>
          <h2 className="font-semibold md:text-[2.5rem] text-[1.5rem] font-primary">
            <span className="text-[#989898]">Ressourcefull </span> developer{" "}
            <span className="text-[#989898]"> specialized in </span> advanced UI
            interaction
          </h2>
        </Column>

        <Column
          colStart={[2, 2, 12, 12]}
          colEnd={[18, 23, 23, 23]}
          className="lg:mt-[200px] mt-[75px] flex flex-col gap-10"
        >
          <p className="font-primary text-[16px]  md:text-xl text-[#434B50]">
            With 6 years of experience as a web developer, I’ve honed my skills
            in transforming design into interactive, high-performing websites.
            My expertise spans various frameworks like Next.js, React, and
            WordPress, while I am equally adept at creating custom themes, UX/UI
            prototypes, and robust e-commerce platforms.
          </p>
          <p className="font-primary text-[16px]  md:text-xl text-[#434B50]">
            I’m passionate about combining code and design to create seamless
            user experiences, delivering websites that are both visually
            compelling and technically sound. From crafting bespoke animations
            using GSAP and Lottie to integrating headless CMS solutions like
            Sanity and WPGraphQL, I offer a full-stack approach to modern web
            development.
          </p>
        </Column>
      </GridContainer>
    </div>
  );
};

export default About;
