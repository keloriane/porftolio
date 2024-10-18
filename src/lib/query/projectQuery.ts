import { client } from "@/sanity/lib/client";
import { ProjectList } from "@/type/ProjectType";
import { groq } from "next-sanity";

// Query to get all projects
export const PROJECTQUERY = groq`*[_type == "projects"]`;
export const PROJECTQUERYIMAGE = groq`*[_type == "projects"][0]{
  projectList[]{
    image,
    slug
  }
}
`;

export const getProjects = async (): Promise<ProjectList[]> => {
  // The fetch should return an array of ProjectList items
  return client.fetch<ProjectList[]>(PROJECTQUERY);
};
export const getProjectsImage = async () => {
  // The fetch should return an array of ProjectList items
  return client.fetch(PROJECTQUERYIMAGE);
};

export const getProjectPage = async (slug: string): Promise<ProjectList> => {
  const query = groq`*[_type == "projects" && defined(projectList[slug.current == $slug])]{
    projectList[slug.current == $slug]
  }[0]`;
  const data = await client.fetch(query, { slug });
  return data;
};
