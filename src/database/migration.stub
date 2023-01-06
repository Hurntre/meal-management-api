import type { Knex } from 'knex';

const tableName = '';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (table) => {
    // this creates an "id" column that gets autoincremented
    table.increments();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
