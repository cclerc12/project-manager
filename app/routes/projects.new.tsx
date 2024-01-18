import type { ActionFunctionArgs, TypedResponse } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import prisma from "../lib/db_connect";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const create = Object.fromEntries(formData);
  await prisma.project.create({
    data: {
      title: create.title as string,
      status: create.status as string,
      description: create.description as string,
    },
  });
  return redirect("/projects/");
};

export default function editProject() {
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
            placeholder="Title"
          />
          <input
            className="focus:outline-none"
            type="text"
            name="status"
            placeholder="Status"
          />
        </div>
        <div className="flex flex-row w-full h-full cursor-text bg-white">
          <textarea
            className="w-full h-full focus:outline-none"
            name="description"
            placeholder="Description"
          />
        </div>
      </Form>
    </div>
  );
}
