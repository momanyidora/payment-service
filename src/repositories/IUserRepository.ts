import type {User} from '../types/userTypes';
import type { CreateUserInput, UpdateUserInput } from '../types/userTypes';
import type { IRepository } from './IRepository';


export interface IUserRepository extends IRepository<User, CreateUserInput, UpdateUserInput> {
  findByEmail(email: string): Promise<User | null>;
}