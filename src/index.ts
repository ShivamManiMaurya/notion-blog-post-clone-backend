import { Hono } from "hono";
import userRoutes from "./routes/users";
import blogRoutes from "./routes/blogs";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1/user", userRoutes);
app.route("/api/v1/blog", blogRoutes);

export default app;
