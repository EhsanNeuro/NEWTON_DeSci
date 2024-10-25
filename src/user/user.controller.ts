import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import {
  GetUserGameHistoryDto,
  GetUserGameHistoryRes,
} from '@app/user/dto/getUserGameHistory.dto';
import {
  GetUserEventHistoryDto,
  GetUserEventHistoryRes,
} from '@app/user/dto/getUserEventHistory.dto';
import { GetMeResponse } from '@app/user/dto/getMe.dto';
import { GetUserReferralsHistoryRes } from '@app/user/dto/getUserReferrals.dto';
import { UserService } from '@app/user/user.service';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: () => GetMeResponse,
  })
  @ApiOperation({ summary: 'Get user information.' })
  @Get('/me')
  getUserInformation(@Req() req: FastifyRequest) {
    return this.userService.getUserInformation(req.user.id);
  }

  @Get('/game-history')
  @ApiOperation({ summary: 'Get user played games history.' })
  @ApiOkResponse({
    type: () => GetUserGameHistoryRes,
  })
  getUserGameHistory(
    @Req() req: FastifyRequest,
    @Query() query: GetUserGameHistoryDto,
  ) {
    return this.userService.getUserGameHistory(req.user.id, query);
  }

  @Get('/event-history')
  @ApiOperation({ summary: 'Get user attended events history.' })
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
  @ApiOperation({ summary: 'Get user friends.' })
  @ApiOkResponse({
    type: () => GetUserReferralsHistoryRes,
  })
  getUserReferrals(
    @Req() req: FastifyRequest,
    @Query() query: GetUserEventHistoryDto,
  ) {
    return this.userService.getUserReferrals(req.user.id, query);
  }
}
