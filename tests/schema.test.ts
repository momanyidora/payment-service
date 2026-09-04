import {it, expect, beforeAll, afterAll} from "vitest";
import { PrismaClient } from "@prisma/client";


let prisma: PrismaClient;
 beforeAll(() => {
    prisma = new PrismaClient()

 })
 afterAll( async() => {
    await prisma.$disconnect()
 } )
it("should have database connection", async() => {
    await expect(prisma.$connect()).resolves.not.toThrow()
})

it("should have users table schema with correct fields", async() => {
    const user = await prisma.user.findFirst();
    expect(user).toHaveProperty("user_id")
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("full_name");
    expect(user).toHaveProperty("password");
    expect(user).toHaveProperty("phone_number");
    expect(user).toHaveProperty("kyc_status");
    expect(user).toHaveProperty("created_at");
})
