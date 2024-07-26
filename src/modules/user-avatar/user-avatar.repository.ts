import { Injectable } from '@nestjs/common';
import { Prisma, UserAvatar } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class UserAvatarRepository {
  constructor(private prisma: PrismaService) {}

  public async save(params: { data: Prisma.UserAvatarCreateInput }): Promise<UserAvatar> {
    const { data } = params;
    return this.prisma.userAvatar.create({
      data: {
        ...data,
      },
    });
  }

  public async find(where: Prisma.UserAvatarWhereUniqueInput): Promise<UserAvatar | null> {
    return this.prisma.userAvatar.findUnique({
      where,
    });
  }

  public async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserAvatarWhereUniqueInput;
    where?: Prisma.UserAvatarWhereInput;
    orderBy?: Prisma.UserAvatarOrderByWithRelationInput[];
  }): Promise<UserAvatar[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.userAvatar.findMany({ skip, take, cursor, where, orderBy: orderBy });
  }

  public async update(params: {
    where: Prisma.UserAvatarWhereUniqueInput;
    data: Prisma.UserAvatarUpdateInput;
  }): Promise<UserAvatar> {
    const { where, data } = params;
    return this.prisma.userAvatar.update({ where, data });
  }

  public async existsByAvatarAndUserCharacterId(image: string, userId: number): Promise<boolean> {
    const findFirst = await this.prisma.userAvatar.findFirst({
      where: {
        image,
        userId,
      },
    });
    return !!findFirst;
  }
}
