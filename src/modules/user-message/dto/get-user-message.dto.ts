import { Expose, Type } from 'class-transformer';
import { GetUserExposeDto } from '@/modules/user/dto/get-user.dto';
import { User } from '@prisma/client';

export class GetUserMessageDto {
  @Expose()
  id: number;

  @Expose()
  isRead: boolean;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => GetUserExposeDto)
  sender: User;
}
