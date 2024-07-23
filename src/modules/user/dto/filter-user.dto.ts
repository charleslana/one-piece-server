import { IsNotEmpty, IsOptional, NotContains } from 'class-validator';

export class FilterUserDto {
  @IsOptional()
  @IsNotEmpty()
  @NotContains(' ')
  email?: string;
}
