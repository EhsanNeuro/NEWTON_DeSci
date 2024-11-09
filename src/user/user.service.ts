import { BotService } from '@app/bot/bot.service';
import { GameRepository } from '@app/database/repositories/game/game.repository';
import { UserRepository } from '@app/database/repositories/user/user.repository';
import { EXTERNAL_REWARD_NAME } from '@app/general/general.interface';
import { ApplyExternalRewardDto } from '@app/user/dto/applyExternalReward.dto';
import { GetExternalRewardRes } from '@app/user/dto/getExternalRewards.dto';
import { GetMeResponse } from '@app/user/dto/getMe.dto';
import { GetUserEventHistoryRes } from '@app/user/dto/getUserEventHistory.dto';
import {
  GetUserGameHistoryDto,
  GetUserGameHistoryRes,
} from '@app/user/dto/getUserGameHistory.dto';
import { GetUserReferralsHistoryRes } from '@app/user/dto/getUserReferrals.dto';
import { generateError } from '@app/utility/error/errorGenerator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly gameRepo: GameRepository,
    private readonly botService: BotService,
  ) {}
  async getUserInformation(userId: number) {
    const user = await this.userRepo.findUserById(userId);

    if (!user) {
      throw generateError(
        [
          {
            message: 'USER_NOT_FOUND',
          },
        ],
        'NOT_FOUND',
      );
    }

    const firstName = user.UserEvent.length
      ? user.UserEvent?.[0].firstName
      : user.firstName;

    const lastName = user.UserEvent.length
      ? user.UserEvent?.[0].lastName
      : user.lastName;
    const totalTokens = await this.gameRepo.getUserTotalTokens(user.id);
    return new GetMeResponse({
      firstName,
      lastName,
      email: user.UserEvent[0]?.email,
      university: user.UserEvent[0]?.university,
      major: user.UserEvent[0]?.major,
      loginStreak: user.loginStreak,
      tokens: totalTokens,
      referralToken: user.referralToken
    });
  }

  async getUserGameHistory(userId: number, filters: GetUserGameHistoryDto) {
    const { data: userGameHistory, count } =
      await this.userRepo.findUserGameByQuery(userId, filters);

    return new GetUserGameHistoryRes({
      result: userGameHistory.map((item) => {
        const { Game } = item;
        const { _count, ...rest } = Game;
        return {
          ...item,
          Game: {
            ...rest,
            winningResult: item.Game.GamePrizePool?.winningResult,
            players: _count.UserGame,
          },
        };
      }),
      total: count,
    });
  }

  async getUserEventHistory(userId: number, filters: GetUserGameHistoryDto) {
    const { data: userEventHistory, count } =
      await this.userRepo.findUserEventByQuery(userId, filters);

    return new GetUserEventHistoryRes({
      result: userEventHistory,
      total: count,
    });
  }

  async getUserReferrals(userId: number, filters: GetUserGameHistoryDto) {
    const { data: userReferralsHistory, count } =
      await this.userRepo.findUserReferralsByQuery(userId, filters);
    return new GetUserReferralsHistoryRes({
      result: userReferralsHistory,
      total: count,
    });
  }

  async getExternalReward(userId: number) {
    const externalRewards = await this.userRepo.getExternalRewards(userId);
    return new GetExternalRewardRes({
      result: externalRewards.map((item) => {
        return {
          isAppliedByUser: !!item.UserExternalReward.length,
          name: item.name,
          reward: item.reward,
        };
      }),
    });
  }

  async applyExternalReward(userId: number, data: ApplyExternalRewardDto) {
    const user = await this.userRepo.findUserById(userId);

    if (!user) {
      throw generateError(
        [
          {
            message: 'USER_NOT_FOUND',
          },
        ],
        'NOT_FOUND',
      );
    }

    const isRewardExists = await this.userRepo.findExternalReward(
      userId,
      data.name,
    );

    if (!isRewardExists) {
      throw generateError(
        [
          {
            message: 'EXTERNAL_REWARD_NOTFOUND',
          },
        ],
        'NOT_FOUND',
      );
    }
    if (isRewardExists?.UserExternalReward.length) {
      throw generateError(
        [
          {
            message: 'REWARD_HAS_ALREADY_APPLIED',
          },
        ],
        'BAD_REQUEST',
      );
    }

    if (isRewardExists?.name === EXTERNAL_REWARD_NAME.TELEGRAM) {
      const response = await this.botService.checkIsUserJoinedToTelegramChannel(
        {
          telegramId: Number(user.telegramId),
        },
      );

      if (
        !response ||
        !['creator', 'member', 'administrator'].includes(response)
      ) {
        throw generateError(
          [
            {
              message: 'User has not joined to telegram channel',
            },
          ],
          'BAD_REQUEST',
        );
      }
    }
    await this.userRepo.applyExternalReward(user.id, isRewardExists.id);
    return;
  }
}
