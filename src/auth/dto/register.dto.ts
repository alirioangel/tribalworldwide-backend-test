import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
;

export class RegisterBaseRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/[a-zA-Z0-9\s]+/)
  @Length(3, 70)
  lastname: string;

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
