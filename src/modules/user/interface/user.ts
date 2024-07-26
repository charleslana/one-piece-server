import { User, UserAvatar } from '@prisma/client';

export interface UserWithAvatar extends User {
  avatars: UserAvatar[];
}
