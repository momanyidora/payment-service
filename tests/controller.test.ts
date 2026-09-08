import { describe, expect, it, vi } from "vitest";
import { createUser } from "../src/controllers/usersController";
import { randomUUID } from "crypto";
import type { Request, Response } from "express";
import { db as prisma } from "../src/prisma/db";

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
      user_id: userId,
      email: "ogutu@gmail.com",
      name: "Ogutu Kwach",
      password: "password",
      phone_number: "0712345678",
      kyc_status: "pending",
      created_at: new Date().toISOString(),
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

  it("should fail when creating a user with an existing email", async () => {
    await prisma.orm.public.User.create({ email: "ogutu@gmail.com" });

    await expect(
      createUser({ body: { email: "ogutu@gmail.com" } } as Request, res),
    ).toThrow("Email already in use");
  });
});
