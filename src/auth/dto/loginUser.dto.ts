import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  initData: string;
}
export class LoginUserRes {
  constructor(data: LoginUserRes) {
    Object.assign(this, data);
  }
  @ApiProperty({
    type: 'string',
    required: true,
  })
  access_token: string;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  expirationTime: number;
}
