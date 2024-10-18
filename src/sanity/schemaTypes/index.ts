import { type SchemaTypeDefinition } from "sanity";
import { projects } from "./projects";
import { expertises } from "./expertises";
import { testimonials } from "./testimonials";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projects, expertises, testimonials],
};
