import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  MinLength,
  NotContains,
} from 'class-validator';

export class CreateAvatarDto {
  @IsNumber()
  @Min(1)
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  userId: number;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  @NotContains(' ')
  image: string;
}
