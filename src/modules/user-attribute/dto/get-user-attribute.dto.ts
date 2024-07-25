import { Expose } from 'class-transformer';

export class GetUserAttributeDto {
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
  attributePoint: number;
}

export class GetUserAttributeExposeDto {
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
}
