import { maximumInt32 } from '@/utils/utils';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  Max,
  MaxLength,
  Min,
  MinLength,
  NotContains,
} from 'class-validator';

export class CreateUserAvatarDto {
  @IsNumber()
  @Min(1)
  @Max(maximumInt32)
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  userId: number;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  @NotContains(' ')
  image: string;
}
