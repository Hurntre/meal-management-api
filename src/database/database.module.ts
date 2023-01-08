import { Global, Module } from '@nestjs/common';
import 'dotenv/config';
import * as Knex from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';
import { BrandModel } from './models/brand.model';
import { AddonModel } from './models/addon.model';
import { AddonCategoryModel } from './models/addon-category.model';

const models = [BrandModel, AddonModel, AddonCategoryModel];
const environment = process.env.NODE_ENV;
const developmentDb = process.env.DATABASE_URL;
const testDb = process.env.TEST_DATABASE_URL;
const dbURL = environment === 'development' ? developmentDb : testDb;

const modelProviders = models.map((model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knex = Knex.knex({
        client: 'pg',
        connection: dbURL,
        debug: process.env.KNEX_DEBUG === 'true',
        ...knexSnakeCaseMappers(),
      });

      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
