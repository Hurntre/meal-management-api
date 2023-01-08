import 'dotenv/config';
import type { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

const environment = process.env.NODE_ENV;
const developmentDb = process.env.DATABASE_URL;
const testDb = process.env.TEST_DATABASE_URL;
const dbURL = environment === 'development' ? developmentDb : testDb;

module.exports = {
  client: 'pg',
  connection: dbURL,
  migrations: {
    directory: './src/database/migrations',
    stub: './src/database/migration.stub',
  },
  seeds: {
    directory: './src/database/seeds',
    stub: './src/database/seed.stub',
  },
  ...knexSnakeCaseMappers(),
} as Knex.Config;
