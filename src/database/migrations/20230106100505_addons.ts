import type { Knex } from 'knex';

const tableName = 'addons';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('description');
    table.integer('price').notNullable();
    table.string('category');
    table.integer('brand_id').references('id').inTable('brands');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(tableName);
}
