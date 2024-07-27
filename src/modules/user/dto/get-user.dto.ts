import { BreedEnum, CharacterClassEnum, FactionEnum, SeaEnum, UserAttribute } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { GetUserAttributeDto } from '@/modules/user-attribute/dto/get-user-attribute.dto';

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
}
