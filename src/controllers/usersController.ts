import type { Request, Response } from "express";
export const createUser = async (req: Request, res: Response) => {
  const user = await db.orm.public.User.create({
    email: "ogutu@gmail.com",
    name: "Ogutu Kwach",
  });

  res.status(201).json({
    status: "success",
    data: user,
  });
};
