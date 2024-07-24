import { AvatarController } from './avatar.controller';
import { AvatarRepository } from './avatar.repository';
import { AvatarService } from './avatar.service';
import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from '@/database/prisma.module';
import { UserCharacterModule } from '../user-character/user-character.module';

@Module({
  imports: [PrismaModule, forwardRef(() => UserCharacterModule)],
  providers: [AvatarService, AvatarRepository],
  controllers: [AvatarController],
  exports: [AvatarService],
})
export class AvatarModule {}
