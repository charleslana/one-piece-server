import { IsNotEmpty, IsOptional } from 'class-validator';

export class FilterUserDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;
}
