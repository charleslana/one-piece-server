import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { NoHtmlTags } from '@/validators/no-html-tags';

export class CreateNewspaperDto {
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
