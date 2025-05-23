import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { SPosts } from "../utils/TypesPosts";
import { Context } from "hono";

const prisma = new PrismaClient({
  datasourceUrl:
    "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZjBjNzRmZTctZmVmYS00MDU1LTgxYmEtZWQ5ZjAyZTFlM2Q1IiwidGVuYW50X2lkIjoiY2YxZmQyNjAwMDFhMjkwZTRlNzc1YzcyY2FkNmZmN2M2M2VkOGNlZGZjOWZlMzRiNzk0NDc3YTcwNzRlZjFkMCIsImludGVybmFsX3NlY3JldCI6ImU2Yzc0MjEyLTczNzgtNDU2ZS05MGQ4LTkyZDBiYjBjYzk5MyJ9.AbotwQS4wt6QVmG8NoUmLuDHVycw7DaXzCHRvBy8kXg",
}).$extends(withAccelerate());

export const insert = async (data: SPosts.TPost, c: Context) => {
  const payload = {
    ...data,
    createdAt: new Date(),
  };

  try {
    const post = await prisma.posts.create({
      data: payload,
    });

    return post;
  } catch (err) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};

export const update = async (
  id: string,
  data: SPosts.TUpdatePost,
  c: Context
) => {
  const payload = {
    ...data,
    updatedAt: new Date(),
  };

  try {
    const updatedPost = await prisma.posts.update({
      where: { id },
      data: payload,
    });

    return updatedPost;
  } catch (err) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};

export const getOnePost = async (id: string, c: Context) => {
  try {
    const singlePost = await prisma.posts.findUnique({
      where: { id },
    });
    const singleUsers = await prisma.users.findUnique({
      where: { id: singlePost?.authorId },
    });

    return { ...singlePost, name: singleUsers?.name };
  } catch (err) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};

export const getPosts = async (c: Context) => {
  try {
    const allPosts = await prisma.posts.findMany();
    const allUsers = await prisma.users.findMany();

    const allPostsWithUser = allPosts.map((post) => {
      const user = allUsers.find((user) => user.id === post.authorId);
      return {
        ...post,
        authName: user?.name ?? "",
      };
    });

    return allPostsWithUser;
  } catch (err) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};

export const deletedAtPost = async (id: string, c: Context) => {
  try {
    const deleteAtPost = await prisma.posts.update({
      where: { id },
      data: {
        deleteAt: new Date(),
      },
    });
    return deleteAtPost;
  } catch (err) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};
