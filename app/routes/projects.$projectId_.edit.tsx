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
    <Form className="w-full h-full" method="post">
      <input type="text" name="title" defaultValue={project.title || ""} />
      <input type="text" name="status" defaultValue={project.status || ""} />
      <textarea name="description" defaultValue={project.description || ""} />
      <button type="submit">Submit</button>
    </Form>
  );
}
