import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { UserEntity } from '../../database/entities/users.entity';
import { UserRolesEnum } from '../../common/enums/user-roles.enum';

export class LoginRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

class UserBasicData
  implements Pick<UserEntity, 'id' | 'name' | 'lastname' | 'email' | 'role'>
{
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  name: string;

  @ApiResponseProperty()
  lastname: string;

  @ApiResponseProperty()
  email: string;

  @ApiResponseProperty()
  role: UserRolesEnum;
}

export class LoginResponseDto {
  @ApiResponseProperty({ type: UserBasicData })
  user: UserBasicData;

  @ApiResponseProperty()
  token: string;
}
