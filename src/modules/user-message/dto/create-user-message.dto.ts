import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { IsTrimmed } from '@/validators/is-trimmed';
import { NoHtmlTags } from '@/validators/no-html-tags';

export class CreateUserMessageDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/, {
    message:
      'O nome deve conter apenas letras, números e espaço, não pode começar ou terminar com espaço',
  })
  name: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  @NoHtmlTags()
  @IsTrimmed()
  @IsString()
  title: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1000)
  @NoHtmlTags()
  @IsTrimmed()
  @IsString()
  description: string;

  @Exclude()
  userId: number;
}
