import { Module } from '@nestjs/common';
import { PrismaModule } from '@/database/prisma.module';
import { UserAvatarRepository } from '../user-avatar/user-avatar.repository';
import { UserAvatarService } from '../user-avatar/user-avatar.service';
import { UserMessageController } from './user-message.controller';
import { UserMessageRepository } from './user-message.repository';
import { UserMessageService } from './user-message.service';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';

@Module({
  imports: [PrismaModule],
  providers: [
    UserMessageService,
    UserMessageRepository,
    UserService,
    UserRepository,
    UserAvatarService,
    UserAvatarRepository,
  ],
  controllers: [UserMessageController],
  exports: [UserMessageService],
})
export class UserMessageModule {}
