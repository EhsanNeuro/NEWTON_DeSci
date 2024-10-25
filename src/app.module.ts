import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { BotModule } from '@app/bot/bot.module';
import { AppConfig } from '@app/config/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database/database.module';
import { UserModule } from '@app/user/user.module';
import { AuthModule } from '@app/auth/auth.module';
import { GameModule } from '@app/game/game.module';
import { EventModule } from '@app/event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig],
    }),
    BotModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    GameModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
