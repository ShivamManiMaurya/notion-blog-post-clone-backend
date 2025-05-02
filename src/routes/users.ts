import { Hono } from "hono";
import { create, checkUser } from "../controllers/users";
import { signinInput, signupInput } from "@shivam-maurya/medium-commons";
import { authMiddleware } from "../middlewares/authentication";

const userRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: String;
  };
}>();

userRoutes.post("/signup", async (c) => {
  try {
    const body = await c.req.json();
    const inputCheck = signupInput.safeParse(body);
    if (!inputCheck.success) {
      c.status(411);
      return c.json({
        message: "Inputs are not correct",
      });
    }

    const response = await create(body, c);
    // @ts-ignore
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
    const inputCheck = signinInput.safeParse(body);
    if (!inputCheck.success) {
      c.status(411);
      return c.json({
        message: "Inputs are not correct",
      });
    }

    const response = await checkUser(body, c);
    if (response && response.success) return c.json(response, 200);
    else return c.json({ message: "Something went wrong.", response }, 500);
  } catch (err) {
    return c.json({ message: "Internal server error", error: err }, 500);
  }
});

export default userRoutes;
