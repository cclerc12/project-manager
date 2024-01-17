import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link, Outlet } from "@remix-run/react";
import prisma from "../lib/db_connect";

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
    <div className="flex flex-row w-screen h-screen">
      <div className="sidebar flex flex-col w-1/4 h-screen bg-white border-r-2 border-slate-100 border-solid">
        {projects.map((project) => (
          <div className="flex flex-row justify-center content-center w-full h-8">
            <Link to={project.id}>{project.title}</Link>
          </div>
        ))}
      </div>
      <div className="detail w-3/4 h-screen bg-white">
        <Outlet />
      </div>
    </div>
  );
}
