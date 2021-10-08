import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsBoolean()
  @IsNotEmpty()
  delivery: boolean;

  @IsBoolean()
  @IsNotEmpty()
  cancellation: boolean;

  @IsOptional()
  rating: number;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  categoryId: number;

  @IsOptional()
  imageUrl: string;
}
