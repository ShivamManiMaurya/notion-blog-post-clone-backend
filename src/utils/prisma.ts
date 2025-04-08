// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";

// // Singleton pattern for Prisma Client
// let prisma: ReturnType<typeof createPrismaClient>;

// const createPrismaClient = (datasourceUrl: string) => {
//   return new PrismaClient({
//     datasourceUrl,
//     log: ["query", "info", "warn", "error"],
//   }).$extends(withAccelerate());
// };

// export const getPrismaClient = (env: { DATABASE_URL: string }) => {
//   if (!prisma) {
//     if (!env.DATABASE_URL) {
//       throw new Error("DATABASE_URL is not defined in environment variables");
//     }
//     prisma = createPrismaClient(env.DATABASE_URL);
//   }
//   return prisma;
// };

// // For testing purposes
// export const resetPrismaClient = () => {
//   if (prisma) {
//     prisma.$disconnect();
//     prisma = undefined as any;
//   }
// };
