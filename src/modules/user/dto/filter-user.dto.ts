import { IsNotEmpty, IsOptional } from 'class-validator';

export class FilterUserDto {
  @IsOptional()
  @IsNotEmpty()
  email?: string;
}
