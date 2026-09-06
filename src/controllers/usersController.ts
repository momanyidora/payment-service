import type { Request, Response } from "express";
import { db } from "../prisma/db";
export const createUser = async (req: Request, res: Response) => {
  const user = await db.orm.public.User.create({
    email: "ogutu@gmail.com",
    name: "Ogutu Kwach",
  });
  console.log("created user:", user);
  res.status(201).json({
    status: "success",
    data: user,
  });
};
