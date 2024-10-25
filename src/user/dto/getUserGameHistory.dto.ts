import { PaginationDto } from '@app/general/general.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Game } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import { IsISO8601, IsOptional } from 'class-validator';

export class GetUserGameHistoryDto extends PaginationDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsISO8601()
  @IsOptional()
  from?: string;

  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsISO8601()
  @IsOptional()
  to?: string;
}
export class GetUserGameHistoryRes {
  constructor(data: GetUserGameHistoryRes) {
    Object.assign(data, this);
  }
  Game: Game;
  reward: number;
  response: JsonValue;
  createdAt: string;
  updatedAt: string;
}
