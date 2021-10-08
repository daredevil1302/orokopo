import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';
export class CreateRentDto {
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  date_from: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  date_to: Date;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  itemId: number;
}
