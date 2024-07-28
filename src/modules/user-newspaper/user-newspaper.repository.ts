import { Injectable } from '@nestjs/common';
import { Prisma, UserNewspaper } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class UserNewspaperRepository {
  constructor(private prisma: PrismaService) {}

  public async save(params: { data: Prisma.UserNewspaperCreateInput }): Promise<UserNewspaper> {
    const { data } = params;
    return this.prisma.userNewspaper.create({
      data: {
        ...data,
      },
    });
  }

  public async find(where: Prisma.UserNewspaperWhereUniqueInput): Promise<UserNewspaper | null> {
    return this.prisma.userNewspaper.findUnique({
      where,
      include: {
        user: true,
      },
    });
  }

  public async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserNewspaperWhereUniqueInput;
    where?: Prisma.UserNewspaperWhereInput;
    orderBy?: Prisma.UserNewspaperOrderByWithRelationInput[];
  }): Promise<UserNewspaper[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.userNewspaper.findMany({ skip, take, cursor, where, orderBy: orderBy });
  }

  public async update(params: {
    where: Prisma.UserNewspaperWhereUniqueInput;
    data: Prisma.UserNewspaperUpdateInput;
  }): Promise<UserNewspaper> {
    const { where, data } = params;
    return this.prisma.userNewspaper.update({ where, data });
  }

  public async delete(params: {
    where: Prisma.UserNewspaperWhereUniqueInput;
  }): Promise<UserNewspaper> {
    const { where } = params;
    return this.prisma.userNewspaper.delete({ where });
  }

  public async findByUserIdAndNewspaperId(
    userId: number,
    newspaperId: number
  ): Promise<UserNewspaper | null> {
    return this.prisma.userNewspaper.findFirst({
      where: {
        userId: userId,
        newspaperId: newspaperId,
      },
    });
  }
}
