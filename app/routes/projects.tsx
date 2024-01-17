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
    <div className="dashboard-container flex flex-row w-screen h-screen">
      <div className="sidebar-container flex flex-row justify-center w-1/4 h-screen border-r-2 border-slate-100 border-solid">
        <div className="sidebar w-10/12 h-full pt-5 pb-5">
          {projects.map((project) => (
            <div className="flex flex-col justify-center w-full h-20 border-b-2 border-slate-100 border-solid hover:bg-theme-blue-600">
              <Link className="text-center" to={project.id}>
                {project.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="description-container flex flex-row justify-center w-3/4 h-screen bg-white">
        <Outlet />
      </div>
    </div>
  );
}
