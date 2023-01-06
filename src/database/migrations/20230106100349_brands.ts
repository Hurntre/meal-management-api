import type { Knex } from 'knex';

const tableName = 'brands';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.string('name').notNullable().unique();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(tableName);
}
