import type { Knex } from 'knex';

const tableName = 'users';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('role').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(tableName);
}
