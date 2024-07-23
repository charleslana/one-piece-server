import { Injectable } from '@nestjs/common';
import { PageDto } from '@/dto/page.dto';
import { Prisma, UserCharacter } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { UserCharacterPaginatedDto } from './dto/user-character.paginated.dto';

@Injectable()
export class UserCharacterRepository {
  constructor(private prisma: PrismaService) {}

  public async findByName(name: string) {
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

  public async find(where: Prisma.UserCharacterWhereUniqueInput): Promise<UserCharacter | null> {
    return this.prisma.userCharacter.findUnique({ where });
  }

  public async update(params: {
    where: Prisma.UserCharacterWhereUniqueInput;
    data: Prisma.UserCharacterUpdateInput;
  }): Promise<UserCharacter> {
    const { where, data } = params;
    return this.prisma.userCharacter.update({ where, data });
  }

  public async findAllPaginated(params: {
    page: PageDto;
    name?: string;
  }): Promise<UserCharacterPaginatedDto<UserCharacter[]>> {
    const { page, name } = params;
    const { page: currentPage, pageSize } = page;
    const offset = (currentPage - 1) * pageSize;
    const take = pageSize;
    const where: Prisma.UserCharacterWhereInput = {};
    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }
    const [totalCount, userCharacters] = await Promise.all([
      this.prisma.userCharacter.count({ where }),
      this.prisma.userCharacter.findMany({
        skip: offset,
        take,
        where,
        orderBy: { id: 'desc' },
      }),
    ]);
    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNextPage = currentPage < totalPages;
    return {
      results: userCharacters,
      pagination: {
        totalCount,
        totalPages,
        currentPage,
        hasNextPage,
      },
    };
  }
}
