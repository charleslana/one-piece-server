import { Expose } from 'class-transformer';

export class GetUserNewspaperDto {
  @Expose()
  id: number;

  @Expose()
  like: boolean;

  @Expose()
  userId: number;

  @Expose()
  newspaperId: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
