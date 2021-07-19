import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/users.entity';
import { JsonWebTokenError } from 'jsonwebtoken';
import { sessionMethod } from './constants/session-token.constants';
import { getError, LocaleEnum } from '../utils/errors';
import {
  BaseTokenInterface,
  TokenWithUserInterface,
} from './constants/tokenWithUserInterface';
import { UserRolesEnum } from '../common/enums/user-roles.enum';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { sessionTokenExpiration } from './constants/token-expirations-time.constants';
import { RegisterBaseRequestDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    userData: RegisterBaseRequestDto,
    locale: LocaleEnum,
  ): Promise<UserEntity> {
    const { email } = userData;
    console.log(userData);
    const role = UserRolesEnum.USER;
    const emailAlreadyExists = await this.checkEmailAlreadyExists(email);
    if (emailAlreadyExists) {
      const errorMessage = getError(locale).UserEmailAlreadyExists;
      throw new BadRequestException(errorMessage);
    }
    return await this.userRepository.save({ ...userData, role });
  }

  async login(
    loginDto: LoginRequestDto,
    locale: LocaleEnum,
  ): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne(
      {
        email,
      },
      {
        select: ['id', 'name', 'lastname', 'email', 'role', 'password'],
      },
    );

    console.log(user);
    if (!user) {
      throw new UnauthorizedException(getError(locale).WrongCredentials);
    }

    if (!user.password) {
      throw new BadRequestException(getError(locale).WrongCredentials);
    }

    const passwordsMatch = await compare(password, user.password);

    if (!passwordsMatch) {
      throw new UnauthorizedException(getError(locale).WrongCredentials);
    }

    delete user.password;

    const tokenPayload: TokenWithUserInterface = {
      userId: user.id,
      method: sessionMethod,
    };
    const token = await this.jwtService.signAsync(tokenPayload, {
      expiresIn: sessionTokenExpiration,
    });

    return {
      user: user,
      token,
    };
  }

  async checkEmailAlreadyExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne(
      { email },
      { select: ['email'] },
    );

    return !!user;
  }

  async verifySessionToken(authorizationHeader: string): Promise<UserEntity> {
    const locale = LocaleEnum.EN;

    const payload = await this.checkToken<TokenWithUserInterface>(
      authorizationHeader,
      sessionMethod,
      locale,
    );

    const user = await this.userRepository.findOne(
      { id: payload.userId },
      {
        select: ['id', 'name', 'lastname', 'email', 'role', 'password'],
      },
    );

    if (!user) {
      throw new UnauthorizedException(getError(locale).UnauthorizedUser);
    }

    return user;
  }

  async checkToken<T extends BaseTokenInterface>(
    authorizationHeader: string,
    allowedMethod: string | string[],
    locale: LocaleEnum,
  ): Promise<T> {
    if (!authorizationHeader) {
      throw new BadRequestException(
        getError(locale).AuthorizationHeaderNotFound,
      );
    }

    if (!Array.isArray(allowedMethod)) {
      allowedMethod = [allowedMethod];
    }

    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer.toLowerCase() !== 'bearer' || !token) {
      throw new BadRequestException(
        getError(locale).AuthorizationHeaderBadFormed,
      );
    }

    let payload: T;

    try {
      payload = await this.jwtService.verifyAsync<T>(token);
    } catch (e) {
      const exception = e as JsonWebTokenError;
      if (exception.name === 'TokenExpiredError') {
        const errorMessage = !allowedMethod.includes(sessionMethod)
          ? getError(locale).ExpiredToken
          : getError(locale).ExpiredToken;
        throw new UnauthorizedException(errorMessage);
      }

      throw new UnauthorizedException(getError(locale).BadJwtToken);
    }

    if (
      !payload ||
      !payload.method ||
      !allowedMethod.includes(payload.method)
    ) {
      throw new UnauthorizedException(getError(locale).BadJwtToken);
    }

    return payload;
  }
}
