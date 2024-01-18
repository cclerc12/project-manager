import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import prisma from "../lib/db_connect";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.projectId, "Missing contactId param");
  await prisma.project.delete({
    where: {
      id: params.projectId,
    },
  });
  return redirect("/projects");
};
