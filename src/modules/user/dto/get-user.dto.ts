import { Expose, Type } from 'class-transformer';
import { GetUserCharacterDto } from '@/modules/user-character/dto/get-ser-character-dto';
import { UserCharacter } from '@prisma/client';

export class GetUserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => GetUserCharacterDto)
  userCharacter: UserCharacter;
}

export class GetUserExposeDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  bannedTime: Date | null;

  @Expose()
  userCharacterId: number;
}
