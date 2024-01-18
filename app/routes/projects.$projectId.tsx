import type { LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";

import prisma from "../lib/db_connect";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.projectId, "No project ID provided");
  const project = await prisma.project.findUnique({
    where: {
      id: params.projectId,
    },
  });
  if (!project) {
    throw new Response("Not found", { status: 404 });
  }
  return json({ project });
};

export default function Project() {
  const { project } = useLoaderData<typeof loader>();

  return (
    <div className="description flex flex-col w-10/12 h-full bg-white dark:bg-[#121212] pt-5 pb-5">
      <div className="button_container flex flex-row items-center justify-end w-full h-16">
        <div className="flex items-center justify-center w-14 h-10 bg-theme-blue-400 hover:bg-theme-blue-600 rounded-lg">
          <Form action="edit">
            <button type="submit" className="text-white">
              Edit
            </button>
          </Form>
        </div>
      </div>
      <div className="title_status-container w-full h-fit mb-6">
        <h1 className="text-3xl font-bold dark:text-[#C8C8C8]">
          {project.title}
        </h1>
        <p className="dark:text-[#C8C8C8]">{project.status}</p>
      </div>

      <div className="flex flex-row w-full h-full border-none cursor-text bg-white dark:bg-[#121212] overflow-auto">
        <p className="w-full h-full whitespace-pre dark:text-[#6C6C6C]">
          {project.description}
        </p>
      </div>
      <div className="flex flex-row items-center justify-end w-full h-16">
        <div className="flex items-center justify-center w-14 h-10 bg-rose-400 hover:bg-rose-600 rounded-lg">
          <Form action="delete" method="post">
            <button className="text-white " type="submit">
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
