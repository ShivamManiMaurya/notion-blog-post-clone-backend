import { decode, sign, verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";

const secret = new TextEncoder().encode("my-secret-key");

export const generateToken = async (paylaod: JWTPayload) => {
  return await sign(paylaod, secret.toString());
};

export const verifyToken = async (token: string) => {
  const payload = await verify(token, secret.toString());
  return payload;
};
