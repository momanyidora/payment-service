import "dotenv/config";
import { it, expect, vi, describe } from "vitest";
import { db as prisma } from "../src/prisma/db";
import type { Request, Response } from "express";
import { createUser } from "../src/controllers/usersController";
import { randomUUID } from "crypto";

//Mocking response from database
function mockDatabaseResponse() {
  const res = {} as Response;
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("createUser tests", () => {
  const userId = randomUUID();
  const req = {
    body: {
      // user_id: userId,
      email: "ogutu@gmail.com",
      name: "Ogutu Kwach",
      // password: "password",
      // phone_number: "0712345678",
      // kyc_status: "pending",
      // created_at: new Date().toISOString(),
    },
  } as Request;
  const res = mockDatabaseResponse();

  it("should create a user in the database", async () => {
    await createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "success",
        data: expect.objectContaining(req.body),
      }),
    );
  });

  // it("should fail when creating a user with an existing email", async () => {
  //   vi.mocked(prisma.findUserByEmail).mockResolvedValue({
  //     email: "ogutu@gmail.com",
  //   });

  //   await expect(
  //     createUser(
  //       { body: { email: "ogutu@gmail.com" } } as Request,
  //       res,
  //     ).rejects.toThrow("Email already in use"),
  //   );
  // });
});

// it("should have users table schema with correct fields", async () => {
//   const user = await prisma.user.findFirst();
//   expect(user).toHaveProperty("user_id");
//   expect(user).toHaveProperty("email");
//   expect(user).toHaveProperty("full_name");
//   expect(user).toHaveProperty("password");
//   expect(user).toHaveProperty("phone_number");
//   expect(user).toHaveProperty("kyc_status");
//   expect(user).toHaveProperty("created_at");
// });

// it("should have wallets schema with correct fields", async () => {
//   const wallet = await prisma.wallet.findFirst();
//   expect(wallet).toHaveProperty("wallet_id");
//   expect(wallet).toHaveProperty("user_id");
//   expect(wallet).toHaveProperty("balance");
//   expect(wallet).toHaveProperty("currency");
//   expect(wallet).toHaveProperty("created_at");
// });
