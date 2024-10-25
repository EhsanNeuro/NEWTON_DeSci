import { GameRepository } from '@app/database/repositories/game/game.repository';
import { AdminCreateGameDto } from '@app/game/dto/adminCreateGame.dto';
import { GetActiveGames } from '@app/game/dto/GetActiveGames.dto';
import { UserPlayGameDto } from '@app/game/dto/userPlayGame.dto';
import { generateError } from '@app/utility/error/errorGenerator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  constructor(private readonly gameRepo: GameRepository) {}
  async adminCreateGame(data: AdminCreateGameDto) {
    const isGameExists = await this.gameRepo.findGameByQuery({
      name: data.name,
      iteration: data.iteration,
      rewardType: data.rewardType,
      type: data.type,
    });

    if (isGameExists) {
      throw generateError(
        [
          {
            message: 'GAME_EXISTS',
          },
        ],
        'BAD_REQUEST',
      );
    }
    return this.gameRepo.createGame(data);
  }

  async userPlayGame(userId: number, data: UserPlayGameDto) {
    const isGameExists = await this.gameRepo.findGameWithUser(
      data.gameId,
      userId,
    );

    if (!isGameExists) {
      throw generateError(
        [
          {
            message: 'GAME_NOT_FOUND',
          },
        ],
        'NOT_FOUND',
      );
    }

    if (isGameExists.UserGame.length) {
      throw generateError(
        [
          {
            message: 'USER_HAS_ALREADY_PLAYED',
          },
        ],
        'BAD_REQUEST',
      );
    }

    await this.gameRepo.createUserGame({
      UserId: userId,
      GameId: data.gameId,
      response: data.response,
    });
    return;
  }

  async getActiveGames() {
    const activeGames = await this.gameRepo.findActiveGames();
    return new GetActiveGames({ result: activeGames });
  }
}
