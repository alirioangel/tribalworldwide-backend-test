import { Column, Entity } from 'typeorm';
import { BaseEntityAbstract } from './base.entity.abstract';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { ApiResponseProperty } from '@nestjs/swagger';

@Entity('Comments')
export class CommentsEntity extends BaseEntityAbstract {
  @ApiResponseProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 500)
  @Column({ length: 500 })
  description: string;

  @ApiResponseProperty()
  @IsNumber()
  @IsNotEmpty()
  @Column()
  movieId: number;

  @ApiResponseProperty()
  @IsNumber()
  @IsNotEmpty()
  @Column()
  userId: number;
}
