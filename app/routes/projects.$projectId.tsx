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
    <div className="flex flex-col content-center w-10/12 h-5/6">
      <div className="button_div flex flex-row items-center justify-end w-full h-16">
        <div className="flex items-center justify-center w-32 h-12 bg-theme-blue-400 hover:bg-theme-blue-600 rounded-lg">
          <p className="text-white">Submit</p>
        </div>
      </div>
      <div className="w-full h-fit mb-6">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p>{project.status}</p>
      </div>
      <div className="description flex flex-row justify-center w-full h-5/16 bg-red-500">
        <div className="flex flex-row w-full h-full border-none cursor-text">
          <p className="w-full h-full">{project.description}</p>
        </div>
      </div>
    </div>
  );
}
