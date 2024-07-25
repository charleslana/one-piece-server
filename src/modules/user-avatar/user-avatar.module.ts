import { Module } from '@nestjs/common';
import { PrismaModule } from '@/database/prisma.module';
import { UserAvatarController } from './user-avatar.controller';
import { UserAvatarRepository } from './user-avatar.repository';
import { UserAvatarService } from './user-avatar.service';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';

@Module({
  imports: [PrismaModule],
  providers: [UserAvatarService, UserAvatarRepository, UserService, UserRepository],
  controllers: [UserAvatarController],
  exports: [UserAvatarService],
})
export class UserAvatarModule {}
