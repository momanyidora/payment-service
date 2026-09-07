#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/c60cdc2faae6c3c10911433d3fede9ac13192dd3148e60c2aa31c38af4dc65de/contract';
import endContract from '../../snapshots/c60cdc2faae6c3c10911433d3fede9ac13192dd3148e60c2aa31c38af4dc65de/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'user',
        columns: [
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
