import { Expose, Type } from 'class-transformer';
import { GetUserNewspaperDto } from '@/modules/user-newspaper/dto/get-user-newspaper.dto';

export class GetNewspaperDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => GetUserNewspaperDto)
  usersNewspaper: GetUserNewspaperDto[];
}
