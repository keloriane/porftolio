"use client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Testimonial = ({ testimonials }: { testimonials: TestimonialItem }) => {
  return (
    <div>
      <Swiper
        navigation={{
          nextEl: ".right",
          prevEl: ".left",
        }}
        spaceBetween={24}
        slidesPerView={2}
        className="mt-[100px]"
      >
        {testimonials.testimonial.map((testimonial, i) => (
          <SwiperSlide key={i}>
            <div className="flex justify-start flex-col gap-5 swiper-slide-content">
              <h4 className="text-2xl font-black">{testimonial.title}</h4>
              <p>{testimonial.testimonial}</p>
            </div>
            <div>
              <div className="flex items-center gap-[24px] mt-[30px]">
                <div className="relative h-[50px] w-[50px]">
                  <Image
                    src={urlFor(testimonial.profilePic).url()}
                    alt=""
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="">
                  <h4 className="text-xl">{testimonial.testimonialName}</h4>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
