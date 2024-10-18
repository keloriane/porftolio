import { getProjects } from "@/lib/query";

export default async function ProjectPage() {
  const projects = await getProjects();

  return (
    <div>
      <h1>Projects</h1>
    </div>
  );
}
