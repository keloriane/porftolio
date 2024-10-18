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
          colStart={[2, 2, 15, 15]}
          colEnd={[16, 23, 23, 23]}
          className="lg:mt-[200px] mt-[75px]"
        >
          <p className="font-primary text-[16px]  md:text-xl text-[#434B50]">
            We craft virtual experiences that have the power
            to unite, excite, educate, enhance work environments, and boost
            business performance. Leveraging immersive technologies, we
            guide companies in comprehending and seamlessly incorporating them.
            We craft virtual experiences that have the power
            to unite, excite, educate, enhance work environments, and boost
            business performance. Leveraging immersive technologies, we
            guide companies in comprehending and seamlessly incorporating them.
          </p>
        </Column>
      </GridContainer>
    </div>
  );
};

export default About;
