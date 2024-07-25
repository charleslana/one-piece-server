import { Expose } from 'class-transformer';

export class GetUserAvatarDto {
  @Expose()
  id: number;

  @Expose()
  image: string;

  @Expose()
  selected: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
