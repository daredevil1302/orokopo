import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

export class FilterItemDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'search' })
  search: string;
}
