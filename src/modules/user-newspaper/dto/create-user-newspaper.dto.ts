import { Exclude, Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, Max, Min } from 'class-validator';
import { maximumInt32 } from '@/utils/utils';

export class CreateUserNewspaperDto {
  @IsNumber()
  @Min(1)
  @Max(maximumInt32)
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  newspaperId: number;

  @IsBoolean()
  like: boolean;

  @Exclude()
  userId: number;
}
