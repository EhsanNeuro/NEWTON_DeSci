import { ApiProperty } from '@nestjs/swagger';

export class GetMeResponse {
  constructor(data: GetMeResponse) {
    Object.assign(data, this);
  }
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  firstName?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  lastName?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  email?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  university?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  major?: string | null;
}
