import { Column, Entity } from 'typeorm';
import { BaseEntityAbstract } from './base.entity.abstract';
import { ApiResponseProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { Exclude } from 'class-transformer';
import { UserRolesEnum } from '../../common/enums/user-roles.enum';

@Entity('Users')
export class UserEntity extends BaseEntityAbstract {
  @ApiResponseProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  @Column({ length: 50 })
  name: string;

  @ApiResponseProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 70)
  @Column({ length: 70 })
  lastname: string;

  @ApiResponseProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Column()
  email: string;

  @ApiResponseProperty({ enum: UserRolesEnum })
  @Column()
  role: UserRolesEnum;

  @Exclude({ toPlainOnly: true })
  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  @Column({ nullable: true })
  password: string;
}
