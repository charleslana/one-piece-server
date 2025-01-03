import { BreedEnum, CharacterClassEnum, FactionEnum, SeaEnum } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';
import { maximumInt32 } from '@/utils/utils';
import { UserDto } from './user.dto';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateUserPasswordDto extends UserDto {
  @IsNotEmpty()
  currentPassword: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  newPassword: string;

  @Exclude()
  id: number;
}

export class UpdateUserDto {
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
  characterClass: CharacterClassEnum;

  @IsNumber()
  @Min(1)
  @Max(maximumInt32)
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  avatarId: number;

  @Exclude()
  userId: number;
}
