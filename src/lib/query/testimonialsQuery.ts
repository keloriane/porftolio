import { client } from "@/sanity/lib/client";
import { ExpertiseItem } from "@/type";
import { groq } from "next-sanity";

export const TESTIMONIALSQUERY = groq`*[_type == "testimonials"]`;

export const getTestimonials = async (): Promise<TestimonialsList> => {
  return client.fetch<TestimonialsList>(TESTIMONIALSQUERY);
};
