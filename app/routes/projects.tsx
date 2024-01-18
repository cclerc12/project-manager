import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link, Outlet, Form } from "@remix-run/react";
import prisma from "../lib/db_connect";

export const loader = async () => {
  const projects = await prisma.project.findMany({
    orderBy: {
      title: "asc",
    },
  });
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
      <div className="sidebar-container flex flex-col w-1/4 h-screen border-r-2 border-slate-100 border-solid">
        <div className="sidebar flex flex-col self-center w-10/12 h-5/6 pt-5 pb-5">
          {projects.map((project) => (
            <Link className="text-center" to={project.id}>
              <div className="flex flex-col justify-center w-full h-20 border-b-2 border-slate-100 border-solid hover:bg-theme-blue-400 hover:text-white hover:rounded-lg">
                {project.title}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-col self-center justify-center w-10/12 h-1/6">
          <div className="flex flex-col items-center justify-center w-14 h-10 bg-theme-blue-400 hover:bg-theme-blue-600 rounded-lg">
            <Form action="./new">
              <button className="text-white" type="submit">
                New
              </button>
            </Form>
          </div>
        </div>
      </div>
      <div className="description-container flex flex-row justify-center w-3/4 h-screen bg-white">
        <Outlet />
      </div>
    </div>
  );
}
