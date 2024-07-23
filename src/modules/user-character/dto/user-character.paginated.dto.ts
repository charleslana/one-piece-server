import { Expose, Type } from 'class-transformer';
import { GetUserCharacterExposeDto } from './get-ser-character-dto';
import { PaginatedDto } from '@/dto/paginated.dto';

export class UserCharacterPaginatedDto<T> {
  @Expose()
  @Type(() => GetUserCharacterExposeDto)
  results: T;

  @Expose()
  @Type(() => PaginatedDto)
  pagination: PaginatedDto;
}
