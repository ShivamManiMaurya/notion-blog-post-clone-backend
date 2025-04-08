import { Hono } from "hono";
import { create, checkUser } from "../controllers/users";

const userRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: String;
  };
}>();

userRoutes.post("/signup", async (c) => {
  try {
    const body = await c.req.json();
    const response = await create(body, c);
    if (response && response.success) return c.json(response, 200);
    return c.json({ message: "Something went wrong.", response }, 500);
  } catch (err) {
    console.log("router err = ", err);
    return c.json({ message: "Internal server error", error: err }, 500);
  }
});

userRoutes.post("/signin", async (c) => {
  try {
    const body = await c.req.json();
    const response = await checkUser(body, c);
    if (response && response.success) return c.json(response, 200);
    else return c.json({ message: "Something went wrong.", response }, 500);
  } catch (err) {
    return c.json({ message: "Internal server error", error: err }, 500);
  }
});

export default userRoutes;
