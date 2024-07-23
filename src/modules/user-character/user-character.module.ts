import { Module } from '@nestjs/common';
import { PrismaModule } from '@/database/prisma.module';
import { UserCharacterController } from './user-character.controller';
import { UserCharacterRepository } from './user-character.repository';
import { UserCharacterService } from './user-character.service';

@Module({
  imports: [PrismaModule],
  providers: [UserCharacterService, UserCharacterRepository],
  controllers: [UserCharacterController],
  exports: [UserCharacterService],
})
export class UserCharacterModule {}
