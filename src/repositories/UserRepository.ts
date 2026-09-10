import { db } from "../prisma/db";
import type { CreateUserInput, UpdateUserInput } from "../types/userTypes";
import type { User } from "../types/userTypes";
import type { IUserRepository } from "./IUserRepository";
import { BaseRepository } from "./BaseRepository";

export class UserRepository
  extends BaseRepository<User, CreateUserInput, UpdateUserInput>
  implements IUserRepository
{
  protected get model() {
    return db.orm.public.User;
  }

  async findByEmail(email: string): Promise<User | null> {
    return db.orm.public.User.where({ email }).first();
  }
}
