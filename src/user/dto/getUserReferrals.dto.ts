import { PaginationDto } from '@app/general/general.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsOptional } from 'class-validator';

export class GetUserReferralsHistoryDto extends PaginationDto {
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
export class GetUserReferralsHistoryRes {
  constructor(data: GetUserReferralsHistoryRes) {
    Object.assign(data, this);
  }
  Friend: {
    firstName?: string | null;
    lastName?: string | null;
  };
  reward: number;
  createdAt: string;
  updatedAt: string;
}
