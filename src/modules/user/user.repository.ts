import { FactionEnum, Prisma, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PageDto } from '@/dto/page.dto';
import { PrismaService } from '@/database/prisma.service';
import { UserPaginatedDto } from './dto/user.paginated.dto';
import { UserWithAvatarAndAttribute } from './interface/user';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  public async save(params: { data: Prisma.UserCreateInput }): Promise<User> {
    const { data } = params;
    return this.prisma.user.create({
      data: {
        ...data,
        attribute: {
          create: {},
        },
        roles: {
          create: {},
        },
        avatars: {
          createMany: {
            data: Array.from({ length: 5 }, (_, i) => ({ image: `${i + 1}` })),
          },
        },
      },
    });
  }

  public async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email: {
          contains: email,
          mode: 'insensitive',
        },
      },
      include: {
        roles: true,
      },
    });
  }

  public async findByName(name: string) {
    return this.prisma.user.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  public async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  public async find(
    where: Prisma.UserWhereUniqueInput
  ): Promise<UserWithAvatarAndAttribute | null> {
    return this.prisma.user.findUnique({
      where,
      include: {
        attribute: true,
        avatars: true,
      },
    });
  }

  public async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({ skip, take, cursor, where, orderBy });
  }

  public async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({ where, data });
  }

  public async delete(params: { where: Prisma.UserWhereUniqueInput }): Promise<User> {
    const { where } = params;
    return this.prisma.user.delete({ where });
  }

  public async findAllPaginatedAndFilter(params: {
    page: PageDto;
    name?: string;
  }): Promise<UserPaginatedDto<UserWithAvatarAndAttribute[]>> {
    const { page, name } = params;
    const { page: currentPage, pageSize } = page;
    const offset = (currentPage - 1) * pageSize;
    const take = pageSize;
    const where: Prisma.UserWhereInput = {
      name: {
        not: null,
      },
    };
    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }
    const [totalCount, users] = await Promise.all([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        skip: offset,
        take,
        where,
        orderBy: [{ level: 'desc' }, { id: 'desc' }],
        include: {
          avatars: true,
          attribute: true,
        },
      }),
    ]);
    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNextPage = currentPage < totalPages;
    return {
      results: users,
      pagination: {
        totalCount,
        totalPages,
        currentPage,
        hasNextPage,
      },
    };
  }

  public async findTopUsersByFaction(): Promise<Record<string, UserWithAvatarAndAttribute[]>> {
    const factions = [FactionEnum.pirate, FactionEnum.marine, FactionEnum.revolutionary];
    const result: Record<string, UserWithAvatarAndAttribute[]> = {};
    for (const faction of factions) {
      const users = await this.prisma.user.findMany({
        where: {
          faction,
          name: {
            not: null,
          },
        },
        orderBy: [{ level: 'desc' }, { id: 'desc' }],
        include: {
          avatars: true,
          attribute: true,
        },
        take: 10,
      });
      result[faction] = users;
    }
    return result;
  }
}
