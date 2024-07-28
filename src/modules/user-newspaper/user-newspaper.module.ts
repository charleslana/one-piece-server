import { Module } from '@nestjs/common';
import { NewspaperRepository } from '../newspaper/newspaper.repository';
import { NewspaperService } from '../newspaper/newspaper.service';
import { PrismaModule } from '@/database/prisma.module';
import { UserAvatarRepository } from '../user-avatar/user-avatar.repository';
import { UserAvatarService } from '../user-avatar/user-avatar.service';
import { UserNewspaperController } from './user-newspaper.controller';
import { UserNewspaperRepository } from './user-newspaper.repository';
import { UserNewspaperService } from './user-newspaper.service';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';

@Module({
  imports: [PrismaModule],
  providers: [
    UserNewspaperService,
    UserNewspaperRepository,
    UserService,
    UserRepository,
    UserAvatarService,
    UserAvatarRepository,
    NewspaperService,
    NewspaperRepository,
  ],
  controllers: [UserNewspaperController],
  exports: [UserNewspaperService],
})
export class UserNewspaperModule {}
