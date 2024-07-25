import { Module } from '@nestjs/common';
import { PrismaModule } from '@/database/prisma.module';
import { UserAvatarRepository } from '../user-avatar/user-avatar.repository';
import { UserAvatarService } from '../user-avatar/user-avatar.service';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  providers: [UserRepository, UserService, UserAvatarService, UserAvatarRepository],
  exports: [UserService],
})
export class UserModule {}
