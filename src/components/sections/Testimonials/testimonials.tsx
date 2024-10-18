import { getTestimonials } from "@/lib/query/testimonialsQuery";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Testimonial from "./testimonial";
import GridContainer from "@/components/common/Container/container";
import Column from "@/components/common/Col/col";

const Testimonials = async () => {
  const testimonials = await getTestimonials();

  return (
    <section id="testimonials" className="md:mt-[250px] mt-[700px]">
      <GridContainer columns={24} gap={"24px"}>
        <Column colStart={[2, 2, 3, 3]} colEnd={[20, 24, 11, 11]}>
          <h2 className="md:text-6xl text-5xl font-semibold text-primary">
            {testimonials[0].title}
          </h2>
        </Column>
        <Column colStart={3} colEnd={21} className="testimonial-container">
          <Testimonial testimonials={testimonials[0]} />
        </Column>
      </GridContainer>
    </section>
  );
};

export default Testimonials;
