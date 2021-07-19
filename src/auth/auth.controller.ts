import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  UnauthorizedException,
  Headers,
  Post,
  Body,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UserEntity } from '../database/entities/users.entity';
import { LocaleEnum } from '../utils/errors';
import { ValidationException } from '../common/exceptions/validation.exception';
import { LocaleQuery } from '../common/queries/locale.query';
import { RegisterBaseRequestDto } from './dto/register.dto';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('verify-token')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Check if a JWT is still valid',
  })
  @ApiOkResponse({
    type: UserEntity,
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
  })
  checkSessionToken(
    @Headers('authorization') authorizationHeader: string,
  ): Promise<UserEntity> {
    return this.authService.verifySessionToken(authorizationHeader);
  }

  @Post('register')
  @ApiQuery({
    name: 'locale',
    description:
      'Allows to change the language of the error messages. If empty, default to "en"',
    required: false,
    enum: LocaleEnum,
    type: 'string',
  })
  @ApiOperation({
    description: 'Register a new generator user',
  })
  @ApiCreatedResponse({
    type: UserEntity,
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
  })
  @ApiUnprocessableEntityResponse({
    type: ValidationException,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
  })
  registerApp(
    @Body() userData: RegisterBaseRequestDto,
    @LocaleQuery() locale: LocaleEnum,
  ): Promise<UserEntity> {
    console.log(userData);
    return this.authService.register(userData, locale);
  }

  @Post('login')
  @HttpCode(200)
  @ApiQuery({
    name: 'locale',
    description:
      'Allows to change the language of the error messages. If empty, default to "en"',
    required: false,
    enum: LocaleEnum,
    type: 'string',
  })
  @ApiOperation({
    description: 'Login a user',
  })
  @ApiOkResponse({
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
  })
  @ApiUnprocessableEntityResponse({
    type: ValidationException,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
  })
  login(
    @Body() loginDto: LoginRequestDto,
    @LocaleQuery() locale: LocaleEnum,
  ): Promise<LoginResponseDto> {
    return this.authService.login(loginDto, locale);
  }
}
