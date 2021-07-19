import { plainToClass } from 'class-transformer';

interface ClassType<T> {
  new (...args: any[]): T;
}

import { BaseEntityAbstract } from './entities/base.entity.abstract';

export const serializeEntity = <T extends BaseEntityAbstract>(
  entityClass: ClassType<T>,
  values: T,
): T => plainToClass(entityClass, values);

export const serializeEntities = <T extends BaseEntityAbstract>(
  entityClass: ClassType<T>,
  values: T[],
): T[] => values.map((entity) => serializeEntity(entityClass, entity));
