import { PrismaService } from '@app/database/database.service';
import { GameRepository } from '@app/database/repositories/game/game.repository';
import { UserRepository } from '@app/database/repositories/user/user.repository';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [PrismaService, UserRepository, GameRepository],
  exports: [UserRepository, GameRepository],
})
export class DatabaseModule {}
