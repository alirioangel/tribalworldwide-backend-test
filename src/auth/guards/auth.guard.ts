import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { getError, LocaleEnum } from '../../utils/errors';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
import { UserEntity } from '../../database/entities/users.entity';
import { AuthorizedRequest } from '../constants/request-type.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const contextType = context.getType();

    let authorization: string;

    if (contextType === 'http')
      authorization = this.extractAuthorizationHttp(context);

    const user = await this.authService.verifySessionToken(authorization);

    const allowedRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!allowedRoles.includes(user.role)) {
      throw new ForbiddenException(getError(LocaleEnum.EN).UnauthorizedUser);
    }

    if (contextType === 'http') {
      const request: { user: UserEntity } = context.switchToHttp().getRequest();
      request.user = user;
    }

    return true;
  }

  private extractAuthorizationHttp(context: ExecutionContext): string {
    const request: AuthorizedRequest = context.switchToHttp().getRequest();
    return request.headers.authorization;
  }
}
