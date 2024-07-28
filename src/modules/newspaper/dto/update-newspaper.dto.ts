import { IsInt, IsNotEmpty, IsNumber, Max, MaxLength, Min, MinLength } from 'class-validator';
import { maximumInt32 } from '@/utils/utils';
import { NoHtmlTags } from '@/validators/no-html-tags';
import { Transform } from 'class-transformer';

export class UpdateNewspaperDto {
  @IsNumber()
  @Min(1)
  @Max(maximumInt32)
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  id: number;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  @NoHtmlTags()
  title: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1000)
  @NoHtmlTags()
  description: string;
}
