import { BreedEnum, CharacterClassEnum, FactionEnum, SeaEnum } from '@prisma/client';
import { Expose } from 'class-transformer';

export class GetUserCharacterDto {
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
  class: CharacterClassEnum | null;

  @Expose()
  level: number;

  @Expose()
  coin: number;

  @Expose()
  gold: number;

  @Expose()
  exp: number;

  @Expose()
  strength: number;

  @Expose()
  defense: number;

  @Expose()
  agility: number;

  @Expose()
  vitality: number;

  @Expose()
  energy: number;

  @Expose()
  stamina: number;

  @Expose()
  attributePoint: number;

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
}

export class GetUserCharacterExposeDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
