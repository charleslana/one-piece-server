import { IsNotEmpty, IsOptional, NotContains } from 'class-validator';

export class FilterUserCharacterDto {
  @IsOptional()
  @IsNotEmpty()
  @NotContains(' ')
  name?: string;
}
