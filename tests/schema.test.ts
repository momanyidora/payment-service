import "dotenv/config";
import { it, expect, vi, describe } from "vitest";
import { db as prisma } from "../src/prisma/db";

it("should have users table schema with correct fields", async () => {
  const user = await prisma.orm.public.User.first();
  expect(user).toHaveProperty("user_id");
  expect(user).toHaveProperty("email");
  expect(user).toHaveProperty("full_name");
  expect(user).toHaveProperty("password");
  expect(user).toHaveProperty("phone_number");
  expect(user).toHaveProperty("kyc_status");
  expect(user).toHaveProperty("created_at");
});

it("should have wallets schema with correct fields", async () => {
  const wallet = await prisma.orm.public.Wallet.first();
  expect(wallet).toHaveProperty("wallet_id");
  expect(wallet).toHaveProperty("user_id");
  expect(wallet).toHaveProperty("balance");
  expect(wallet).toHaveProperty("currency");
  expect(wallet).toHaveProperty("created_at");
});
