import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserEntity } from '../../database/entities/users.entity';
import { UserIsRequestOwnerInterface } from '../interfaces/user-is-request.interface';

export const requestUserQueryParamFactory = (
  _: void,
  ctx: ExecutionContext,
): UserEntity => {
  const request = ctx.switchToHttp().getRequest<UserIsRequestOwnerInterface>();

  return request.user;
};

export const RequestUserQuery = createParamDecorator(
  requestUserQueryParamFactory,
);
