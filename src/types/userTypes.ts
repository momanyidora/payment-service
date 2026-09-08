export type User = {
  id: string;
  email: string;
  name: string | null;
};

export type CreateUserInput = {
  email: string;
  name?: string | null;
};

export type UpdateUserInput = Partial<CreateUserInput>;
