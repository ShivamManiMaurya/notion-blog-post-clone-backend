import { Hono } from "hono";
import { cors } from "hono/cors";
import userRoutes from "./routes/users";
import blogRoutes from "./routes/blogs";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*", // Or a specific origin like "https://your-frontend.com"
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1/user", userRoutes);
app.route("/api/v1/blog", blogRoutes);

export default app;
