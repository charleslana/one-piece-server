import { Injectable } from '@nestjs/common';
// import { PageDto } from '@/dto/page.dto';
import { Prisma, UserCharacter } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
// import { UserPaginatedDto } from './dto/user.paginated.dto';

@Injectable()
export class UserCharacterRepository {
  constructor(private prisma: PrismaService) {}

  async findByName(name: string) {
    return this.prisma.userCharacter.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  public async findById(id: number): Promise<UserCharacter | null> {
    return this.prisma.userCharacter.findUnique({
      where: {
        id,
      },
    });
  }

  public async get(where: Prisma.UserCharacterWhereUniqueInput): Promise<UserCharacter | null> {
    return this.prisma.userCharacter.findUnique({ where });
  }

  public async updateUser(params: {
    where: Prisma.UserCharacterWhereUniqueInput;
    data: Prisma.UserCharacterUpdateInput;
  }): Promise<UserCharacter> {
    const { where, data } = params;
    return this.prisma.userCharacter.update({ where, data });
  }

  // public async findAllPaginated(page: PageDto): Promise<UserPaginatedDto<UserCharacter[]>> {
  //   const { page: currentPage, pageSize } = page;
  //   const offset = (currentPage - 1) * pageSize;
  //   const take = pageSize;
  //   const [totalCount, userCharacters] = await Promise.all([
  //     this.prisma.userCharacter.count(),
  //     this.prisma.userCharacter.findMany({
  //       skip: offset,
  //       take,
  //       orderBy: { id: 'desc' },
  //     }),
  //   ]);
  //   const totalPages = Math.ceil(totalCount / pageSize);
  //   const hasNextPage = currentPage < totalPages;
  //   return {
  //     results: userCharacters,
  //     pagination: {
  //       totalCount,
  //       totalPages,
  //       currentPage,
  //       hasNextPage,
  //     },
  //   };
  // }
}
