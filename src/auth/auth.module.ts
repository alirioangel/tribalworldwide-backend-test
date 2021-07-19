import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/users.entity';
import { AuthController } from './auth.controller';
import { UsersSubscriber } from '../database/subscribers/users.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('jwt') as JwtModuleOptions,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, UsersSubscriber],
  exports: [AuthService],
})
export class AuthModule {}
