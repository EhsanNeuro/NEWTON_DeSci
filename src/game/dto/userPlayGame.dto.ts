import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UserPlayGameDto {
  @ApiProperty({
    type: 'number',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  gameId: number;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  response: string;
}
