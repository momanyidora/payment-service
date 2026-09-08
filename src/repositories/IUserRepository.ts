import type {User} from '../types/userTypes';
import type { CreateUserInput, UpdateUserInput } from '../types/userTypes';


export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(data: CreateUserInput): Promise<User>;
  update(id: string, data: UpdateUserInput): Promise<User | null>;
  delete(id: string): Promise<User | null>;
}