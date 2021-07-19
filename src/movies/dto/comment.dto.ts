import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { Column } from 'typeorm';

export class CommentRequestDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 500)
  @Column({ length: 500 })
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Column()
  movieId: number;
}
