import { AuthHelper } from '@app/auth/auth.helper';
import { ITelegramUser } from '@app/auth/auth.interface';
import { LoginUserDto } from '@app/auth/dto/loginUser.dto';
import { UserRepository } from '@app/database/repositories/user/user.repository';
import { generateError } from '@app/utility/error/errorGenerator';
import { HttpService } from '@app/utility/http/http.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly authHelper: AuthHelper,
    private readonly userRepo: UserRepository,
  ) {}
  async userLogin(data: LoginUserDto) {
    const { initData } = data;

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
      throw generateError(
        [
          {
            message: 'USER_NOT_FOUND',
          },
        ],
        'NOT_FOUND',
      );
    }
    let { token, expirationTime } = this.authHelper.getJwtToken(user);

    return {
      access_token: token,
      expirationTime,
    };
  }
}
