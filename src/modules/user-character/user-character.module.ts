import { AvatarModule } from '../avatar/avatar.module';
import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from '@/database/prisma.module';
import { UserCharacterController } from './user-character.controller';
import { UserCharacterRepository } from './user-character.repository';
import { UserCharacterService } from './user-character.service';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';

@Module({
  imports: [PrismaModule, forwardRef(() => AvatarModule)],
  providers: [UserCharacterService, UserCharacterRepository, UserService, UserRepository],
  controllers: [UserCharacterController],
  exports: [UserCharacterService],
})
export class UserCharacterModule {}
