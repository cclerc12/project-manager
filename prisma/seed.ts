import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  const project = await prisma.project.create({
    data: {
      title: "Project 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl sed aliquet ultricies, nunc nunc ultricies nunc, sed aliquet nisl massa in tellus. Nam auctor, nisl nec ultricies ultricies, nisl nisl aliquet nisl, nec aliquet nisl nisl nec nisl. ",
      status: "In Progress",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
