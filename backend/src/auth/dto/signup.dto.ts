import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'surname' })
  surname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'street' })
  street: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'city' })
  city: string;

  @MinLength(5)
  @MaxLength(5)
  @ApiProperty({ type: String, description: 'zip code' })
  zip: string;

  @ApiProperty({ type: String, description: 'name' })
  rating: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'phone' })
  phone: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty({ type: Date, description: 'Date', example: '2021-08-23' })
  date: Date;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  @ApiProperty({ type: String, description: 'password' })
  password: string;
}
