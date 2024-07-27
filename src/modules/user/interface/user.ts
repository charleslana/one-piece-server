import { User, UserAttribute, UserAvatar } from '@prisma/client';

export interface UserWithAvatar extends User {
  avatars: UserAvatar[];
}

export interface UserWithAvatarAndAttribute extends User {
  avatars: UserAvatar[];
  attribute: UserAttribute;
}
