import { Injectable } from '@nestjs/common';
import { Newspaper, Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class NewspaperRepository {
  constructor(private prisma: PrismaService) {}

  public async save(params: { data: Prisma.NewspaperCreateInput }): Promise<Newspaper> {
    const { data } = params;
    return this.prisma.newspaper.create({
      data: {
        ...data,
      },
    });
  }

  public async find(where: Prisma.NewspaperWhereUniqueInput): Promise<Newspaper | null> {
    return this.prisma.newspaper.findUnique({
      where,
    });
  }

  public async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.NewspaperWhereUniqueInput;
    where?: Prisma.NewspaperWhereInput;
    orderBy?: Prisma.NewspaperOrderByWithRelationInput[];
  }): Promise<Newspaper[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.newspaper.findMany({ skip, take, cursor, where, orderBy: orderBy });
  }

  public async update(params: {
    where: Prisma.NewspaperWhereUniqueInput;
    data: Prisma.NewspaperUpdateInput;
  }): Promise<Newspaper> {
    const { where, data } = params;
    return this.prisma.newspaper.update({ where, data });
  }

  public async delete(params: { where: Prisma.NewspaperWhereUniqueInput }): Promise<Newspaper> {
    const { where } = params;
    return this.prisma.newspaper.delete({ where });
  }
}
