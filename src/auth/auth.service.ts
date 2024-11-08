import { AuthHelper } from '@app/auth/auth.helper';
import { ITelegramUser } from '@app/auth/auth.interface';
import { LoginUserDto } from '@app/auth/dto/loginUser.dto';
import { UserRepository } from '@app/database/repositories/user/user.repository';
import { generateError } from '@app/utility/error/errorGenerator';
import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly authHelper: AuthHelper,
    private readonly userRepo: UserRepository,
  ) {}
  async userLogin(data: LoginUserDto) {
    const { initData, referralToken } = data;

    const decodedInitData = new URLSearchParams(initData);

    const isDataValid = this.authHelper.verifyInitDataFromWebApp({
      decodedInitData,
    });

    if (!isDataValid) {
      throw generateError(
        [
          {
            message: 'ERROR_IN_DATA',
          },
        ],
        'BAD_REQUEST',
      );
    }
    const telegramUser = decodedInitData.get('user');

    if (!telegramUser) {
      throw generateError(
        [
          {
            message: 'ERROR_IN_USER',
          },
        ],
        'BAD_REQUEST',
      );
    }

    // const authDate = decodedInitData.get('auth_date');

    // if (
    //   authDate &&
    //   Number(authDate) <
    //     Math.floor(
    //       (Date.now() - config.telegramBot.tokenExpirationTime * 1000) / 1000,
    //     )
    // ) {
    //   return res.status(400).send({ info: 'ERROR_IN_AUTH_DATE' });
    // }

    const parsedUser: ITelegramUser = JSON.parse(telegramUser);
    const telegramId = parsedUser.id;
    const user = await this.userRepo.findUserByTelegramId(telegramId);
    if (!user) {
      const firstName = parsedUser.first_name;
      const lastName = parsedUser.last_name;
      const newUser = await this.userRepo.createUser({
        referralToken: randomUUID(),
        telegramId,
        firstName,
        lastName,
        lastLogin: new Date(),
        loginStreak: 1,
      });
      await this.userRepo
        .addUserReferral({
          Friend: {
            connect: {
              id: newUser.id,
            },
          },
          Owner: {
            connect: {
              referralToken,
            },
          },
        })
        .catch((err) => {
          Logger.error(
            `Create referral User failed. referralToken = ${referralToken}`,
            err,
          );
        });
      const { token, expirationTime } = this.authHelper.getJwtToken(newUser);

      return {
        access_token: token,
        expirationTime,
      };
    }
    if (
      dayjs(user.lastLogin).add(1, 'day').format('YYYY-MM-DD') ===
      dayjs().format('YYYY-MM-DD')
    ) {
      await this.userRepo.addUserStreak(user.id, user.loginStreak + 1);
    } else if (
      dayjs(user.lastLogin).add(1, 'day').format('YYYY-MM-DD') <
      dayjs().format('YYYY-MM-DD')
    ) {
      await this.userRepo.addUserStreak(user.id, 1);
    } else {
      await this.userRepo.updateUserLastLogin(user.id);
    }
    const { token, expirationTime } = this.authHelper.getJwtToken(user);

    return {
      access_token: token,
      expirationTime,
    };
  }
}
