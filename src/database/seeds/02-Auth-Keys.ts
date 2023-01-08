import type { Knex } from 'knex';
import { AuthTokenModel } from '../models/auth-token.model';

export async function seed(knex: Knex): Promise<any> {
  await AuthTokenModel.query(knex).insert([
    {
      id: 1,
      token: 'MjA.F24QA5r-P4rfF1lZF-O5458OX3EoeY_GVGAHv1Okf42hzFyhSaLvXVJTnZQE',
      userId: 1,
    },
    {
      id: 2,
      token: 'Mjc1.qI_NjaiE8gqNDAvEv5jbCCkkiTj-qGsSXJOYOfLwLgtQ-iIuNfCS3jDGAQ',
      userId: 2,
    },
  ]);
}
