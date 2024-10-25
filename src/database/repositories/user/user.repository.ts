import { PrismaService } from '@app/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }
  findUserByTelegramId(telegramId: number) {
    return this.prisma.user.findUnique({
      where: {
        telegramId,
      },
    });
  }
  findUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        UserEvent: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            email: true,
            firstName: true,
            lastName: true,
            major: true,
            university: true,
          },
        },
      },
    });
  }
  addUserReferral(data: Prisma.UserReferralCreateInput) {
    return this.prisma.userReferral.create({
      data,
    });
  }

  findUserByReferralToken(referralToken: string) {
    return this.prisma.user.findUnique({
      where: {
        referralToken,
      },
      select: {
        id: true,
      },
    });
  }

  findUserGameByQuery(
    userId: number,
    filters: {
      from?: string;
      to?: string;
      limit: number;
      offset: number;
    },
  ) {
    const { limit, offset, from, to } = filters;
    const query: Prisma.UserGameFindManyArgs['where'] = {
      UserId: userId,
    };
    if (from) {
      query.AND = [
        {
          createdAt: { gte: from },
        },
      ];
    }
    if (to) {
      if (query.AND && query.AND instanceof Array) {
        query.AND.push({
          createdAt: { lte: to },
        });
      } else {
        query.AND = [
          {
            createdAt: { lte: to },
          },
        ];
      }
    }
    return this.prisma.userGame.findMany({
      where: query,
      take: limit,
      skip: offset,
      select: {
        Game: true,
        reward: true,
        response: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findUserEventByQuery(
    userId: number,
    filters: {
      from?: string;
      to?: string;
      limit: number;
      offset: number;
    },
  ) {
    const { limit, offset, from, to } = filters;
    const query: Prisma.UserEventFindManyArgs['where'] = {
      UserId: userId,
    };
    if (from) {
      query.AND = [
        {
          createdAt: { gte: from },
        },
      ];
    }
    if (to) {
      if (query.AND && query.AND instanceof Array) {
        query.AND.push({
          createdAt: { lte: to },
        });
      } else {
        query.AND = [
          {
            createdAt: { lte: to },
          },
        ];
      }
    }
    return this.prisma.userEvent.findMany({
      where: query,
      take: limit,
      skip: offset,
      select: {
        Event: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        major: true,
        university: true,
        firstName: true,
        lastName: true,
      },
    });
  }

  findUserReferralsByQuery(
    userId: number,
    filters: {
      from?: string;
      to?: string;
      limit: number;
      offset: number;
    },
  ) {
    const { limit, offset, from, to } = filters;
    const query: Prisma.UserReferralFindManyArgs['where'] = {
      OwnerId: userId,
    };
    if (from) {
      query.AND = [
        {
          createdAt: { gte: from },
        },
      ];
    }
    if (to) {
      if (query.AND && query.AND instanceof Array) {
        query.AND.push({
          createdAt: { lte: to },
        });
      } else {
        query.AND = [
          {
            createdAt: { lte: to },
          },
        ];
      }
    }
    return this.prisma.userReferral.findMany({
      where: query,
      take: limit,
      skip: offset,
      select: {
        Friend: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        createdAt: true,
        reward: true,
        updatedAt: true,
      },
    });
  }
}
