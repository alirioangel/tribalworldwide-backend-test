import { Request } from 'express';
import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

import { getError, LocaleEnum } from '../../utils/errors';

const isLocaleValueValid = (value: string) =>
  value === LocaleEnum.EN || value === LocaleEnum.ES;

export const localeQueryParamFactory = (
  _: void,
  ctx: ExecutionContext,
): LocaleEnum => {
  const request: Request = ctx.switchToHttp().getRequest();
  const localeQuery = (request.query?.locale as string) || '';

  if (!localeQuery) {
    return LocaleEnum.EN;
  }

  if (Array.isArray(localeQuery)) {
    throw new BadRequestException(getError(LocaleEnum.EN).LocaleValueInvalid);
  }

  const sanitizedLocaleQuery = localeQuery.trim().toLowerCase();

  if (!isLocaleValueValid(sanitizedLocaleQuery)) {
    throw new BadRequestException(getError(LocaleEnum.EN).LocaleValueInvalid);
  }

  return sanitizedLocaleQuery as LocaleEnum;
};

export const LocaleQuery = createParamDecorator(localeQueryParamFactory);
