import { ApiProperty } from '@nestjs/swagger';
import { Category } from './../../entities/category.entity';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'description' })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: 'price' })
  price: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ type: Boolean, description: 'delivery' })
  delivery: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ type: Boolean, description: 'cancellation' })
  cancellation: boolean;

  @IsOptional()
  @ApiProperty({ type: Number, description: 'rating' })
  rating: number;

  @IsOptional()
  @ApiProperty({ type: Number, description: 'userID' })
  userId: number;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ type: Array, description: 'IDs of categories' })
  categoryIds: number[];

  @IsOptional()
  @ApiProperty({ type: String, description: 'imageUrl' })
  imageUrl: string;
}
