import {
  ClassSerializerInterceptor,
  Module,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ClassValidatorErrorsToValidationExceptionFactory } from './common/pipes/validation-factory.pipe';
import application from './config/application';
import database from './config/database';

const appPipe = (cons: (errors: ValidationError[]) => any) => ({
  provide: APP_PIPE,
  useValue: new ValidationPipe({
    validationError: { target: false, value: true },
    exceptionFactory: cons,
  }),
});
const appInterceptor = <T>(cons: T) => ({
  provide: APP_INTERCEPTOR,
  useClass: cons,
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [application, database],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('database') as TypeOrmModuleOptions,
    }),

    UsersModule,
    AuthModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    appPipe(ClassValidatorErrorsToValidationExceptionFactory),
    appInterceptor(ClassSerializerInterceptor),
  ],
})
export class AppModule {}
