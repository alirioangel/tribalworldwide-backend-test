import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default () => {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, NODE_ENV, DB_SSL } =
    process.env;

  return {
    database: {
      type: 'postgres',
      database: DB_NAME,
      password: DB_PASSWORD,
      host: DB_HOST,
      username: DB_USER,
      entities: [path.resolve(__dirname, '..', '**/**.entity!(*.d).{ts,js}')],
      synchronize: NODE_ENV === 'local',
      logging: NODE_ENV !== 'production',
      ssl: DB_SSL === 'true',
    } as TypeOrmModuleOptions,
  };
};
