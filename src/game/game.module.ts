import { GameController } from '@app/game/game.controller';
import { GameService } from '@app/game/game.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
