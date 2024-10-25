import { UserRepository } from '@app/database/repositories/user/user.repository';
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
  constructor(private readonly userRepo: UserRepository) {}
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
    const firstName = user.UserEvent[0].firstName
      ? user.UserEvent[0].firstName
      : user.firstName;

    const lastName = user.UserEvent[0].lastName
      ? user.UserEvent[0].lastName
      : user.lastName;
    return new GetMeResponse({
      firstName,
      lastName,
      email: user.UserEvent[0].email,
      university: user.UserEvent[0].university,
      major: user.UserEvent[0].major,
    });
  }

  async getUserGameHistory(userId: number, filters: GetUserGameHistoryDto) {
    const userGameHistory = await this.userRepo.findUserGameByQuery(
      userId,
      filters,
    );

    return new GetUserGameHistoryRes({ result: userGameHistory });
  }

  async getUserEventHistory(userId: number, filters: GetUserGameHistoryDto) {
    const userEventHistory = await this.userRepo.findUserEventByQuery(
      userId,
      filters,
    );

    return new GetUserEventHistoryRes({ result: userEventHistory });
  }

  async getUserReferrals(userId: number, filters: GetUserGameHistoryDto) {
    const userReferralsHistory = await this.userRepo.findUserReferralsByQuery(
      userId,
      filters,
    );
    return new GetUserReferralsHistoryRes({ result: userReferralsHistory });
  }
}
