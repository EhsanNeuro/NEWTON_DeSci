import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { DatabaseModule } from '@app/database/database.module';

@Module({
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
