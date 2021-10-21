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

export class UpdateItemDto {
  @IsString()
  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @IsString()
  @ApiProperty({ type: String, description: 'description' })
  description: string;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'price' })
  price: number;

  @IsBoolean()
  @ApiProperty({ type: Boolean, description: 'delivery' })
  delivery: boolean;

  @IsBoolean()
  @ApiProperty({ type: Boolean, description: 'cancellation' })
  cancellation: boolean;

  @IsOptional()
  @ApiProperty({ type: Number, description: 'rating' })
  rating: number;

  @IsArray()
  @ApiProperty({ type: Array, description: 'IDs of categories' })
  categoryIds: number[];

  @IsOptional()
  @ApiProperty({ type: String, description: 'image url' })
  imageUrl: string;
}
