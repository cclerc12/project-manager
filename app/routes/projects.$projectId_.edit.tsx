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

export default function editProject() {
  const { project } = useLoaderData<typeof loader>();

  return <Form method="post"></Form>;
}
