import { Context, Next } from "hono";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ message: "Unauthorized - No token provided" }, 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = await verifyToken(token);
    c.set("user", payload);
    return await next();
  } catch (err) {
    return c.json({ message: "Unauthorized - Invalid or expired token" }, 403);
  }
};
