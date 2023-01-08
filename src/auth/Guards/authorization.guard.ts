import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthService } from 'src/auth/auth.service';
import { Users } from '../../utilities/DummyUsers';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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

    console.log(await this.authService.findAuthenticatedUser(token));

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
