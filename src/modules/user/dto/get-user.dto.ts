import { Expose, Type } from 'class-transformer';
import { GetUserAttributeDto } from '@/modules/user-attribute/dto/get-user-attribute.dto';
import {
  BreedEnum,
  CharacterClassEnum,
  FactionEnum,
  SeaEnum,
  User,
  UserAttribute,
} from '@prisma/client';

export class GetUserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  bannedTime: Date | null;

  @Expose()
  name: string | null;

  @Expose()
  faction: FactionEnum | null;

  @Expose()
  sea: SeaEnum | null;

  @Expose()
  breed: BreedEnum | null;

  @Expose()
  characterClass: CharacterClassEnum | null;

  @Expose()
  level: number;

  @Expose()
  coin: number;

  @Expose()
  gold: number;

  @Expose()
  exp: number;

  @Expose()
  stamina: number;

  @Expose()
  victoryPve: number;

  @Expose()
  defeatPve: number;

  @Expose()
  victoryPvp: number;

  @Expose()
  defeatPvp: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => GetUserAttributeDto)
  attribute: UserAttribute;

  @Expose()
  avatar: string | null;

  @Expose()
  battlePower: number;

  @Expose()
  consecutiveVictory: number;
}

export class GetUserExposeDto {
  @Expose()
  id: number;

  @Expose()
  name: string | null;

  @Expose()
  faction: FactionEnum | null;

  @Expose()
  sea: SeaEnum | null;

  @Expose()
  breed: BreedEnum | null;

  @Expose()
  characterClass: CharacterClassEnum | null;

  @Expose()
  level: number;

  @Expose()
  coin: number;

  @Expose()
  exp: number;

  @Expose()
  stamina: number;

  @Expose()
  victoryPve: number;

  @Expose()
  defeatPve: number;

  @Expose()
  victoryPvp: number;

  @Expose()
  defeatPvp: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  avatar: string | null;

  @Expose()
  battlePower: number;

  @Expose()
  consecutiveVictory: number;
}

export class GetTopUsersByFactionDto {
  @Expose()
  @Type(() => GetUserExposeDto)
  pirate: User;

  @Expose()
  @Type(() => GetUserExposeDto)
  marine: User;

  @Expose()
  @Type(() => GetUserExposeDto)
  revolutionary: User;
}

export class GetTopUsersByCharacterClassDto {
  @Expose()
  @Type(() => GetUserExposeDto)
  swordsman: User;

  @Expose()
  @Type(() => GetUserExposeDto)
  shooter: User;

  @Expose()
  @Type(() => GetUserExposeDto)
  fighter: User;
}
