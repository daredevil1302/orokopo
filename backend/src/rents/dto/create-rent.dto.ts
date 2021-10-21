import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';
export class CreateRentDto {
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'Date from',
    example: '2021-08-23 15:30:21',
  })
  date_from: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'Date to',
    example: '2021-08-23 15:30:21',
  })
  date_to: Date;

  @IsNotEmpty()
  @ApiProperty({ type: Number, description: 'ID of User' })
  userId: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number, description: 'ID of Item' })
  itemId: number;
}
