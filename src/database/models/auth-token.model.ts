import { Model } from 'objection';
import { UserModel } from './user.model';

export class AuthTokenModel extends Model {
  static tableName = 'auth_tokens';

  id: number;
  token: string;
  userId: number;

  user: UserModel;

  static relationMappings = {
    user: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.HasOneRelation,
      join: {
        from: 'authTokens.userId',
        to: 'user.id',
      },
    },
  };
}
