import { it, expect, beforeAll, afterAll } from "vitest";
import { db as prisma } from "../src/prisma/db";

beforeAll(async () => {
  await prisma.connect();
});
afterAll(async () => {
  await prisma.close();
});
it("should have database connection", async () => {
  await expect(prisma.connect()).resolves.not.toThrow();
});

it("should have users table schema with correct fields", async () => {
  const user = await prisma.user.findfirst();
  expect(user).toHaveProperty("user_id");
  expect(user).toHaveProperty("email");
  expect(user).toHaveProperty("full_name");
  expect(user).toHaveProperty("password");
  expect(user).toHaveProperty("phone_number");
  expect(user).toHaveProperty("kyc_status");
  expect(user).toHaveProperty("created_at");
});
