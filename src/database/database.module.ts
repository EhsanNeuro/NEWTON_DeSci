import { PrismaService } from '@app/database/database.service';
import { UserRepository } from '@app/database/repositories/user/user.repository';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [PrismaService, UserRepository],
  exports: [UserRepository],
})
export class DatabaseModule {}
