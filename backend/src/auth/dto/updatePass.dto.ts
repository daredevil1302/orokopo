import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePassDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'password' })
  password: string;
}
