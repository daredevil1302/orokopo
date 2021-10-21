import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: 'rating' })
  rating: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'description' })
  description: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty({ type: Date, description: 'Date', example: '2021-08-23' })
  date: Date;

  @IsNotEmpty()
  @ApiProperty({ type: Number, description: 'ID of User' })
  userId: number;
}
