import { Injectable } from '@nestjs/common';
import { Prisma, UserMessage } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class UserMessageRepository {
  constructor(private prisma: PrismaService) {}

  public async save(params: { data: Prisma.UserMessageCreateInput }): Promise<UserMessage> {
    const { data } = params;
    return this.prisma.userMessage.create({
      data: {
        ...data,
      },
    });
  }

  public async find(where: Prisma.UserMessageWhereUniqueInput): Promise<UserMessage | null> {
    return this.prisma.userMessage.findUnique({
      where,
      include: {
        user: true,
      },
    });
  }

  public async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserMessageWhereUniqueInput;
    where?: Prisma.UserMessageWhereInput;
    orderBy?: Prisma.UserMessageOrderByWithRelationInput[];
  }): Promise<UserMessage[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.userMessage.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy: orderBy,
      include: { sender: true },
    });
  }

  public async update(params: {
    where: Prisma.UserMessageWhereUniqueInput;
    data: Prisma.UserMessageUpdateInput;
  }): Promise<UserMessage> {
    const { where, data } = params;
    return this.prisma.userMessage.update({ where, data });
  }

  public async delete(params: { where: Prisma.UserMessageWhereUniqueInput }): Promise<UserMessage> {
    const { where } = params;
    return this.prisma.userMessage.delete({ where });
  }

  public async markAllMessagesAsRead(userId: number): Promise<number> {
    const result = await this.prisma.userMessage.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
    return result.count;
  }

  public async deleteAllMessagesForUser(userId: number): Promise<number> {
    const result = await this.prisma.userMessage.deleteMany({
      where: {
        userId,
      },
    });
    return result.count;
  }
}
