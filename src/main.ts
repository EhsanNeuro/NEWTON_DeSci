import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { CONFIG_NAME, IAppConfig } from 'src/config/config.interface';
import { Logger } from '@nestjs/common';
import { AppModule } from '@app/app.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from '@app/utility/logger/logger';
import { setupSwagger } from '@app/general/setupSwagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: WinstonModule.createLogger(winstonConfig),
    },
  );

  const config = app.get<ConfigService>(ConfigService);
  await setupSwagger(app);

  await app.listen(
    {
      port: config.get<IAppConfig>(CONFIG_NAME.APP_CONFIG)?.appPort || 3000,
      host: '0.0.0.0',
    },
    () =>
      Logger.log(
        `App started successfully on port ${config.get<IAppConfig>(CONFIG_NAME.APP_CONFIG)?.appPort}`,
      ),
  );
}
bootstrap();
