import { beforeEach, describe, expect, it, vi } from "vitest";

const mockUserModel = vi.hoisted(() => ({
  where: vi.fn(),
  all: vi.fn(),
  create: vi.fn(),
}));

vi.mock("../src/prisma/db", () => ({
  db: { orm: { public: { User: mockUserModel } } },
}));

import { UserRepository } from "../src/repositories/UserRepository";
import type { CreateUserInput, UpdateUserInput, User } from "../src/types/userTypes";

type WhereChain = {
  first: ReturnType<typeof vi.fn>;
  update: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
};

function makeWhereChain(resolvedValue: unknown): WhereChain {
  return {
    first: vi.fn().mockResolvedValue(resolvedValue),
    update: vi.fn().mockResolvedValue(resolvedValue),
    delete: vi.fn().mockResolvedValue(resolvedValue),
  };
}

describe("UserRepository (BaseRepository specialized for User)", () => {
  let repo: UserRepository;
  let whereChain: WhereChain;
  const user: User = { id: "u1", email: "ogutu@gmail.com", name: "Ogutu Kwach" };

  beforeEach(() => {
    vi.clearAllMocks();
    repo = new UserRepository();
    whereChain = makeWhereChain(user);
    mockUserModel.where.mockReturnValue(whereChain);
    mockUserModel.all.mockResolvedValue([user]);
    mockUserModel.create.mockResolvedValue(user);
  });

  it("findById calls db.orm.public.User.where({ id }).first()", async () => {
    const result = await repo.findById("u1");

    expect(mockUserModel.where).toHaveBeenCalledWith({ id: "u1" });
    expect(whereChain.first).toHaveBeenCalledOnce();
    expect(result).toEqual(user);
  });

  it("findAll calls db.orm.public.User.all()", async () => {
    const result = await repo.findAll();

    expect(mockUserModel.all).toHaveBeenCalledOnce();
    expect(result).toEqual([user]);
  });

  it("create calls db.orm.public.User.create(data)", async () => {
    const input: CreateUserInput = { email: "ogutu@gmail.com", name: "Ogutu Kwach" };

    const result = await repo.create(input);

    expect(mockUserModel.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(user);
  });

  it("update calls db.orm.public.User.where({ id }).update(data)", async () => {
    const input: UpdateUserInput = { name: "Updated Name" };

    const result = await repo.update("u1", input);

    expect(mockUserModel.where).toHaveBeenCalledWith({ id: "u1" });
    expect(whereChain.update).toHaveBeenCalledWith(input);
    expect(result).toEqual(user);
  });

  it("delete calls db.orm.public.User.where({ id }).delete()", async () => {
    const result = await repo.delete("u1");

    expect(mockUserModel.where).toHaveBeenCalledWith({ id: "u1" });
    expect(whereChain.delete).toHaveBeenCalledOnce();
    expect(result).toEqual(user);
  });

  it("findByEmail calls db.orm.public.User.where({ email }).first() (User-specific, not inherited)", async () => {
    const result = await repo.findByEmail("ogutu@gmail.com");

    expect(mockUserModel.where).toHaveBeenCalledWith({ email: "ogutu@gmail.com" });
    expect(whereChain.first).toHaveBeenCalledOnce();
    expect(result).toEqual(user);
  });

  it("findByEmail returns null when no user matches", async () => {
    whereChain.first.mockResolvedValueOnce(null);

    await expect(repo.findByEmail("missing@gmail.com")).resolves.toBeNull();
  });
});
