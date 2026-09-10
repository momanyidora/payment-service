export interface IRepository<TEntity, TCreate, TUpdate> {
  findById(id: string): Promise<TEntity | null>;
  findAll(): Promise<TEntity[]>;
  create(data: TCreate): Promise<TEntity>;
  update(id: string, data: TUpdate): Promise<TEntity | null>;
  delete(id: string): Promise<TEntity | null>;
}
