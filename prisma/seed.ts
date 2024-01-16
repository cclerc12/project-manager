import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function seed() {
  await prisma.project.deleteMany();
  const project = await prisma.project.createMany({
    data: [
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
        status: "In Progress",
      },
      {
        title: "Project 3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl sed aliquet ultricies, nunc nunc ultricies nunc, sed aliquet nisl massa in tellus. Nam auctor, nisl nec ultricies ultricies, nisl nisl aliquet nisl, nec aliquet nisl nisl nec nisl. ",
        status: "In Progress",
      },
    ],
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
