import { BreedEnum, CharacterClassEnum, FactionEnum, SeaEnum } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsEnum, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateUserCharacterDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
  @MaxLength(20, { message: 'O nome não pode ter mais de 20 caracteres' })
  @Matches(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/, {
    message:
      'O nome deve conter apenas letras, números e espaço, não pode começar ou terminar com espaço',
  })
  name: string;

  @IsNotEmpty()
  @IsEnum(FactionEnum)
  faction: FactionEnum;

  @IsNotEmpty()
  @IsEnum(SeaEnum)
  sea: SeaEnum;

  @IsNotEmpty()
  @IsEnum(BreedEnum)
  breed: BreedEnum;

  @IsNotEmpty()
  @IsEnum(CharacterClassEnum)
  class: CharacterClassEnum;

  @Exclude()
  id: number;
}
