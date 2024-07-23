import { Exclude } from 'class-transformer';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { UserDto } from './user.dto';

export class UpdateUserPasswordDto extends UserDto {
  @IsNotEmpty()
  currentPassword: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  newPassword: string;

  @Exclude()
  id: number;
}
