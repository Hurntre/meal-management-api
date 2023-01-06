import type { Knex } from 'knex';

const tableName = 'addon_categories';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.string('name').notNullable();
    table.integer('brand_id').references('id').inTable('brands');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(tableName);
}
