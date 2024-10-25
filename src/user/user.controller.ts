import { Controller, Get, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { GetUserGameHistoryDto } from '@app/user/dto/getUserGameHistory.dto';
import {
  GetUserEventHistoryDto,
  GetUserEventHistoryRes,
} from '@app/user/dto/getUserEventHistory.dto';
import { GetMeResponse } from '@app/user/dto/getMe.dto';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: () => GetMeResponse,
  })
  @Get('/me')
  getUserInformation(@Req() req: FastifyRequest) {
    return this.userService.getUserInformation(req.user.id);
  }

  @Get('/game-history')
  getUserGameHistory(
    @Req() req: FastifyRequest,
    @Query() query: GetUserGameHistoryDto,
  ) {
    return this.userService.getUserGameHistory(req.user.id, query);
  }

  @Get('/event-history')
  @ApiOkResponse({
    type: () => GetUserEventHistoryRes,
  })
  getUserEventHistory(
    @Req() req: FastifyRequest,
    @Query() query: GetUserEventHistoryDto,
  ) {
    return this.userService.getUserEventHistory(req.user.id, query);
  }

  @Get('/referral')
  getUserReferrals(
    @Req() req: FastifyRequest,
    @Query() query: GetUserEventHistoryDto,
  ) {
    return this.userService.getUserReferrals(req.user.id, query);
  }
}
