//https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/querying-the-database-typescript-postgresql

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany();
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
