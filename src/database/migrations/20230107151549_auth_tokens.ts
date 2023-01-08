import type { Knex } from 'knex';

const tableName = 'auth_tokens';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.string('token').notNullable();
    table.integer('user_id').references('id').inTable('users');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
