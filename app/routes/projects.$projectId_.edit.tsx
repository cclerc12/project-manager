import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
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

export const action = async ({ request, params }: ActionFunctionArgs) => {
  invariant(params.projectId, "No project ID provided");
  const formData = await request.formData();
  const update = Object.fromEntries(formData);
  await prisma.project.update({
    where: { id: params.projectId },
    data: update,
  });
  return redirect(`/projects/${params.projectId}`);
};

export default function editProject() {
  const { project } = useLoaderData<typeof loader>();

  return (
    <div className="edit_container flex flex-col w-10/12 h-full pt-5 pb-5">
      <Form className="flex flex-col w-full h-full" method="post">
        <div className="flex flex-row items-center justify-end w-full h-16">
          <div className="flex items-center justify-center w-14 h-10 bg-theme-blue-400 hover:bg-theme-blue-600 rounded-lg">
            <button className="text-white" type="submit">
              Submit
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full h-fit mb-6">
          <input
            className="text-3xl font-bold focus:outline-none"
            type="text"
            name="title"
            defaultValue={project.title || ""}
          />
          <input
            className="focus:outline-none"
            type="text"
            name="status"
            defaultValue={project.status || ""}
          />
        </div>
        <div className="flex flex-row w-full h-full cursor-text bg-white">
          <textarea
            className="w-full h-full focus:outline-none"
            name="description"
            defaultValue={project.description || ""}
          />
        </div>
      </Form>
    </div>
  );
}
