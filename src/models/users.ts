import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { generateToken } from "../utils/jwt";
import { Context } from "hono";
import { SUsers } from "../utils/TypesUsers";

const prisma = new PrismaClient({
  datasourceUrl:
    "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZjBjNzRmZTctZmVmYS00MDU1LTgxYmEtZWQ5ZjAyZTFlM2Q1IiwidGVuYW50X2lkIjoiY2YxZmQyNjAwMDFhMjkwZTRlNzc1YzcyY2FkNmZmN2M2M2VkOGNlZGZjOWZlMzRiNzk0NDc3YTcwNzRlZjFkMCIsImludGVybmFsX3NlY3JldCI6ImU2Yzc0MjEyLTczNzgtNDU2ZS05MGQ4LTkyZDBiYjBjYzk5MyJ9.AbotwQS4wt6QVmG8NoUmLuDHVycw7DaXzCHRvBy8kXg",
}).$extends(withAccelerate());

export const insert = async (data: SUsers.TSignup, c: Context) => {
  try {
    const user = await prisma.users.create({
      data,
    });

    console.log("user created = ", user);
    return user;
  } catch (err) {
    console.log("err = ", err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};

export const validateUser = async (email: string, c: Context) => {
  try {
    const validUser = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!validUser) return;

    const payload = {
      email,
      exp: Math.floor(Date.now() / 1000) + 60 * 15,
      userId: validUser.id,
    };

    const token = await generateToken(payload);
    return token;
  } catch (err) {
    console.log("err = ", err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};
