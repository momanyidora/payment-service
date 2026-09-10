import type { IRepository } from "./IRepository";

type OrmModel<TEntity, TCreate, TUpdate, TFilter> = {
  where(filter: TFilter): {
    first(): Promise<TEntity | null>;
    update(data: TUpdate): Promise<TEntity | null>;
    delete(): Promise<TEntity | null>;
  };
  all(): Promise<TEntity[]>;
  create(data: TCreate): Promise<TEntity>;
};

export abstract class BaseRepository<
  TEntity,
  TCreate,
  TUpdate,
  TFilter extends Record<string, unknown> = Record<string, unknown>,
> implements IRepository<TEntity, TCreate, TUpdate> {
  protected abstract get model(): OrmModel<TEntity, TCreate, TUpdate, TFilter>;

  private idFilter(id: string): TFilter {
    const filter: Record<string, unknown> = { id };
    return filter as TFilter;
  }

  async findById(id: string): Promise<TEntity | null> {
    return this.model.where(this.idFilter(id)).first();
  }

  async findAll(): Promise<TEntity[]> {
    return this.model.all();
  }

  async create(data: TCreate): Promise<TEntity> {
    return this.model.create(data);
  }

  async update(id: string, data: TUpdate): Promise<TEntity | null> {
    return this.model.where(this.idFilter(id)).update(data);
  }

  async delete(id: string): Promise<TEntity | null> {
    return this.model.where(this.idFilter(id)).delete();
  }
}
