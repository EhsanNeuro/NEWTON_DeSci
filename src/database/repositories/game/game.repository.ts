import { PrismaService } from '@app/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class GameRepository {
  constructor(private readonly prisma: PrismaService) {}

  createGame(data: Prisma.GameCreateInput) {
    return this.prisma.game.create({
      data,
    });
  }

  findGameByQuery(where: Prisma.GameFindFirstArgs['where']) {
    return this.prisma.game.findFirst({
      where,
    });
  }

  findGameWithUser(gameId: number, userId: number) {
    return this.prisma.game.findUnique({
      where: {
        id: gameId,
      },
      include: {
        UserGame: {
          where: {
            UserId: userId,
          },
        },
      },
    });
  }

  findActiveGames() {
    return this.prisma.game.findMany({
      where: {
        startAt: { lte: new Date() },
        endAt: { gte: new Date() },
      },
      orderBy: {
        startAt: 'asc',
      },
      select: {
        id: true,
        name: true,
        endAt: true,
        iteration: true,
        rewardType: true,
        startAt: true,
        type: true,
      },
    });
  }

  createUserGame(data: Prisma.UserGameUncheckedCreateInput) {
    return this.prisma.userGame.create({ data });
  }
}
