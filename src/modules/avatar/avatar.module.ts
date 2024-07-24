import { AvatarController } from './avatar.controller';
import { AvatarRepository } from './avatar.repository';
import { AvatarService } from './avatar.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from '@/database/prisma.module';
import { UserCharacterRepository } from '../user-character/user-character.repository';
import { UserCharacterService } from '../user-character/user-character.service';

@Module({
  imports: [PrismaModule],
  providers: [AvatarService, AvatarRepository, UserCharacterService, UserCharacterRepository],
  controllers: [AvatarController],
  exports: [AvatarService],
})
export class AvatarModule {}
