import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const loader = async () => {
  const projects = await prisma.project.findMany();
  return json({ projects });
};

export const meta: MetaFunction = () => {
  return [
    { title: "Projects" },
    { name: "description", content: "Handling Projects" },
  ];
};

export default function Index() {
  const { projects } = useLoaderData<typeof loader>();
  return (
    <div className="w-screen h-screen bg-theme-white-200">
      {projects.map((project) => (
        <div className="">
          <Link to={project.id}>{project.title}</Link>
        </div>
      ))}
    </div>
  );
}
