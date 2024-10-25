import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { GameService } from './game.service';
import { AdminCreateGameDto } from '@app/game/dto/adminCreateGame.dto';
import { UserPlayGameDto } from '@app/game/dto/userPlayGame.dto';
import { FastifyRequest } from 'fastify';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { GetActiveGames } from '@app/game/dto/GetActiveGames.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('/')
  adminCreateGame(@Body() body: AdminCreateGameDto) {
    return this.gameService.adminCreateGame(body);
  }

  @Post('/play')
  @ApiCreatedResponse()
  userPlayGame(@Req() req: FastifyRequest, @Body() body: UserPlayGameDto) {
    return this.gameService.userPlayGame(req.user.id, body);
  }

  @Get('/active-game')
  @ApiOkResponse({
    type: () => GetActiveGames,
  })
  getActiveGames() {
    return this.gameService.getActiveGames();
  }
}
