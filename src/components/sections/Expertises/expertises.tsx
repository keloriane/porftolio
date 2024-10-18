import Column from "@/components/common/Col/col";
import GridContainer from "@/components/common/Container/container";
import { getExpertises } from "@/lib/query/expertisesQuery";
import React from "react";
import ExpertiseItemSection from "./expertise";
import { ExpertiseItem } from "@/type";

const Expertises = async () => {
  const expertise: ExpertiseItem[] = await getExpertises();

  return (
    <section
      id={"expertises"}
      className="md:mt-[250px] mt-[100px] h-[100vh] flex flex-col justify-center relative"
    >
      <GridContainer columns={24} gap={"24px"}>
        <Column colStart={[2, 2, 8, 8]} colEnd={[24, 24, 18, 18]}>
          <div className="flex flex-col gap-[24px]">
            <h2 className="font-semibold md:text-6xl text:5xl text-primary text-center">
              {expertise[0].title}
            </h2>
            <p className="text-light text-center">
              “We are consultants, researchers, designers, 3D artists,
              programmers, marketers, and challenge enthusiasts. We merge
              analytical, technical, creative, and strategic skills with a
              relentless pursuit of technological advancements. We thrive on
              testing and refining, we revel in innovation, but most
              importantly, we thrive on self-improvement.”
            </p>
          </div>
        </Column>
      </GridContainer>
      <ExpertiseItemSection expertises={expertise[0].expertises} />
    </section>
  );
};

export default Expertises;
