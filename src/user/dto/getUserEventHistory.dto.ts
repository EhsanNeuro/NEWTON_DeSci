import { PaginationDto } from '@app/general/general.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Event } from '@prisma/client';
import { IsISO8601, IsOptional } from 'class-validator';

export class GetUserEventHistoryDto extends PaginationDto {
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
export class GetUserEventHistoryRes {
  constructor(data: GetUserEventHistoryRes) {
    Object.assign(data, this);
  }

  Event: Event;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  email: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  major?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  university?: string | null;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  firstName: string;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  lastName: string;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  createdAt: string;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  updatedAt: string;
}
