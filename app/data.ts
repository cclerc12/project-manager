import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";

type ProjectMutation = {
  id?: string;
  title?: string;
  description?: string;
  status?: string;
  createdAt?: string;
  notes?: string;
};

export type ProjectRecord = ProjectMutation & {
  id: string;
  createdAt: string;
};

const projects = {
  records: {} as Record<string, ProjectRecord>,

  async getAll(): Promise<ProjectRecord[]> {
    return Object.keys(projects.records)
      .map((key) => projects.records[key])
      .sort(sortBy("createdAt", "last"));
  },

  async get(id: string): Promise<ProjectRecord | null> {
    return projects.records[id] || null;
  },

  async create(values: ProjectMutation): Promise<ProjectRecord> {
    const id = Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newProject = { ...values, id, createdAt };
    projects.records[id] = newProject;
    return newProject;
  },
};

export async function getProjects(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let _projects = await projects.getAll();
  if (query) {
    _projects = matchSorter(_projects, query, { keys: ["title"] });
  }
  return _projects.sort(sortBy("createdAt"));
}

export async function getProject(id: string) {
  return projects.get(id);
}

[
  {
    title: "Project 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl sed aliquet ultricies, nunc nunc ultricies nunc, sed aliquet nisl massa in tellus. Nam auctor, nisl nec ultricies ultricies, nisl nisl aliquet nisl, nec aliquet nisl nisl nec nisl. ",
    status: "In Progress",
  },
  {
    title: "Project 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl sed aliquet ultricies, nunc nunc ultricies nunc, sed aliquet nisl massa in tellus. Nam auctor, nisl nec ultricies ultricies, nisl nisl aliquet nisl, nec aliquet nisl nisl nec nisl. ",
    status: "Complete",
  },
  {
    title: "Project 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl sed aliquet ultricies, nunc nunc ultricies nunc, sed aliquet nisl massa in tellus. Nam auctor, nisl nec ultricies ultricies, nisl nisl aliquet nisl, nec aliquet nisl nisl nec nisl. ",
    status: "Not Started",
  },
].forEach((project) => {
  projects.create(project);
});
