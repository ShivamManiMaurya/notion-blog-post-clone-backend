import { Context, Hono } from "hono";
import { authMiddleware } from "../middlewares/authentication";
import {
  create,
  updatePost,
  getSinglePost,
  getAllPosts,
  deletePost,
} from "../controllers/blogs";

const blogRoutes = new Hono();

blogRoutes.post("/", authMiddleware, async (c: Context) => {
  try {
    const body = await c.req.json();
    const response = await create(body, c);
    if (response && response.success) return c.json(response, 200);
    return c.json({ message: "Something went wrong." }, 500);
  } catch (err) {
    return c.json({ message: "Internal server error", error: err }, 500);
  }
});

blogRoutes.patch("/:id", authMiddleware, async (c: Context) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const response = await updatePost(id, body, c);
    if (response && response.success) return c.json(response, 200);
    return c.json({ message: "Something went wrong." }, 500);
  } catch (err) {
    return c.json({ message: "Internal server error", error: err }, 500);
  }
});

blogRoutes.get("/:id", authMiddleware, async (c: Context) => {
  try {
    const id = c.req.param("id");
    const response = await getSinglePost(id, c);
    if (response && response.success) return c.json(response, 200);
    return c.json({ message: "Something went wrong." }, 500);
  } catch (err) {
    return c.json({ message: "Internal server error", error: err }, 500);
  }
});

blogRoutes.get("/bulk", authMiddleware, async (c: Context) => {
  try {
    const id = c.req.param("id");
    const response = await getAllPosts(c);
    if (response && response.success) return c.json(response, 200);
    return c.json({ message: "Something went wrong." }, 500);
  } catch (err) {
    return c.json({ message: "Internal server error", error: err }, 500);
  }
});

blogRoutes.patch("/delete/:id", authMiddleware, async (c: Context) => {
  try {
    const id = c.req.param("id");
    const response = await deletePost(id, c);
    if (response && response.success) return c.json(response, 200);
    return c.json({ message: "Something went wrong." }, 500);
  } catch (err) {
    c.json({ message: "Internal server error", error: err }, 500);
  }
});

export default blogRoutes;
