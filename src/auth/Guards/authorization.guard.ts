import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { Users } from '../DummyUsers';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const {
      headers: { authorization },
    } = context.switchToHttp().getRequest();

    if (!authorization) {
      throw new HttpException('User unauthorized', HttpStatus.FORBIDDEN);
    }

    const token = authorization.split(' ')[1];

    const user = Users.find((user) => user.token === token);

    if (!user) {
      throw new HttpException('User unauthorized', HttpStatus.FORBIDDEN);
    }

    if (!requiredRoles.includes(user.role)) {
      throw new HttpException(
        'This user is not authorized to access this route',
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}
