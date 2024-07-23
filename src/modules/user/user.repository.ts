import { Injectable } from '@nestjs/common';
import { PageDto } from '@/dto/page.dto';
import { Prisma, User, UserCharacter } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { UserPaginatedDto } from './dto/user.paginated.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  public async save(params: { data: Prisma.UserCreateInput }): Promise<User> {
    const { data } = params;
    const user = await this.createUserAndRole(data);
    const userCharacter = await this.createUserCharacter(user.id);
    await this.update({
      where: { id: user.id },
      data: {
        userCharacter: {
          connect: { id: userCharacter.id },
        },
      },
    });
    return user;
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

  public async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  public async find(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where,
      include: {
        userCharacter: true,
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

  public async findAllPaginated(page: PageDto): Promise<UserPaginatedDto<User[]>> {
    const { page: currentPage, pageSize } = page;
    const offset = (currentPage - 1) * pageSize;
    const take = pageSize;
    const [totalCount, users] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.findMany({
        skip: offset,
        take,
        orderBy: { id: 'desc' },
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

  private async createUserAndRole(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        roles: {
          create: {},
        },
      },
    });
  }

  private async createUserCharacter(userId: number): Promise<UserCharacter> {
    return this.prisma.userCharacter.create({
      data: {
        userId: userId,
        avatars: {
          createMany: {
            data: Array.from({ length: 5 }, (_, i) => ({ image: `${i + 1}` })),
          },
        },
      },
    });
  }
}
