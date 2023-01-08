import { Model } from 'objection';

export class UserModel extends Model {
  static tableName = 'users';

  id: number;
  name: string;
  email: string;
  role: string;
}
