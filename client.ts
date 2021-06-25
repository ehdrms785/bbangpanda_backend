// import { PrismaClient } from ".prisma/client";
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from ".prisma/client";

const client = new PrismaClient();

async function start() {
  const hello = await client.user.findMany({
    orderBy: {},
  });
}
export default client;
