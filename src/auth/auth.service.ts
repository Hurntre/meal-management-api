import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { AuthTokenModel } from '../database/models/auth-token.model';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthTokenModel')
    private authTokenModel: ModelClass<AuthTokenModel>,
  ) {}

  async findAuthenticatedUser(token: string) {
    return await this.authTokenModel
      .query()
      .where({ token })
      .withGraphFetched('user');
  }
}
