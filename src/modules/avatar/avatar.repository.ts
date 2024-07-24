import { Avatar, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class AvatarRepository {
  constructor(private prisma: PrismaService) {}

  public async save(params: { data: Prisma.AvatarCreateInput }): Promise<Avatar> {
    const { data } = params;
    return this.prisma.avatar.create({
      data: {
        ...data,
      },
    });
  }

  public async find(where: Prisma.AvatarWhereUniqueInput): Promise<Avatar | null> {
    return this.prisma.avatar.findUnique({
      where,
    });
  }

  public async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AvatarWhereUniqueInput;
    where?: Prisma.AvatarWhereInput;
    orderBy?: Prisma.AvatarOrderByWithRelationInput;
  }): Promise<Avatar[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.avatar.findMany({ skip, take, cursor, where, orderBy });
  }

  public async update(params: {
    where: Prisma.AvatarWhereUniqueInput;
    data: Prisma.AvatarUpdateInput;
  }): Promise<Avatar> {
    const { where, data } = params;
    return this.prisma.avatar.update({ where, data });
  }

  public async existsByAvatarAndUserCharacterId(
    image: string,
    userCharacterId: number
  ): Promise<boolean> {
    const findFirst = await this.prisma.avatar.findFirst({
      where: {
        image,
        userCharacterId,
      },
    });
    return !!findFirst;
  }
}
