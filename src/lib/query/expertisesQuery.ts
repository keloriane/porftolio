import { client } from "@/sanity/lib/client";
import { ExpertiseItem } from "@/type";
import { groq } from "next-sanity";

export const EXPERTISESQUERY = groq`*[_type == "expertises"]`;

export const getExpertises = async (): Promise<ExpertiseItem[]> => {
  return client.fetch<ExpertiseItem[]>(EXPERTISESQUERY);
};
