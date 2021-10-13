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
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  delivery: boolean;

  @IsBoolean()
  cancellation: boolean;

  @IsOptional()
  rating: number;

  @IsArray()
  categoryIds: number[];

  @IsOptional()
  imageUrl: string;
}
