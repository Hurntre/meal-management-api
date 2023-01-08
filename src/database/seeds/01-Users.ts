import type { Knex } from 'knex';
import { UserModel } from '../models/user.model';
import { Role } from '../../auth/enums/role.enum';

export async function seed(knex: Knex): Promise<any> {
  await UserModel.query(knex).insert([
    {
      id: 1,
      name: 'user1',
      email: 'user1@gmail.com',
      role: Role.User,
    },
    {
      id: 2,
      name: 'admin1',
      email: 'admin@gmail.com',
      role: Role.Admin,
    },
  ]);
}
