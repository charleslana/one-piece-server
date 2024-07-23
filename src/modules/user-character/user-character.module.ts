import { Module } from '@nestjs/common';
import { UserCharacterService } from './user-character.service';
import { UserCharacterController } from './user-character.controller';

@Module({
  providers: [UserCharacterService],
  controllers: [UserCharacterController],
})
export class UserCharacterModule {}
