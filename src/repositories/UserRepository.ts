import { db } from '../prisma/db';
import type { CreateUserInput, UpdateUserInput} from '../types/userTypes';
import type {User} from '../types/userTypes';
import type { IUserRepository } from './IUserRepository';


export class UserRepository implements IUserRepository {
 async findById(id: string): Promise<User | null> {
   return db.orm.public.User.where({ id }).first();
 }

 async findByEmail(email: string): Promise<User | null> {
   return db.orm.public.User.where({ email }).first();
 }

 async findAll(): Promise<User[]> {
   return db.orm.public.User.all();
 }

 async create(data: CreateUserInput): Promise<User> {
   return db.orm.public.User.create(data);
 }

 async update(id: string, data: UpdateUserInput): Promise<User | null> {
   return db.orm.public.User.where({ id }).update(data);
 }

 async delete(id: string): Promise<User | null> {
   return db.orm.public.User.where({ id }).delete();
 }
}
