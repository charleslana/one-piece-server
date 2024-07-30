import { BusinessRuleException } from '@/helpers/error/BusinessRuleException';
import { CreateUserMessageDto } from './dto/create-user-message.dto';
import { Injectable } from '@nestjs/common';
import { UserMessageRepository } from './user-message.repository';
import { UserService } from '../user/user.service';

@Injectable()
export class UserMessageService {
  constructor(
    private repository: UserMessageRepository,
    private userService: UserService
  ) {}

  public async create(dto: CreateUserMessageDto) {
    const user = await this.userService.get(dto.userId);
    await this.userService.validateUserCompleted(user.id);
    const getUserByName = await this.userService.getUserByName(dto.name);
    if (user.id === getUserByName.id) {
      throw new BusinessRuleException('Você não pode enviar mensagens para você mesmo.');
    }
    const save = await this.repository.save({
      data: {
        title: dto.title,
        description: dto.description,
        sender: {
          connect: {
            id: user.id,
          },
        },
        user: {
          connect: {
            id: getUserByName.id,
          },
        },
      },
    });
    return save;
  }

  public async getAll(userId: number) {
    const findAll = await this.repository.findAll({
      where: {
        userId,
      },
      take: 50,
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          id: 'desc',
        },
      ],
    });
    return findAll;
  }

  public async exclude(id: number, userId: number) {
    await this.userService.get(userId);
    await this.get(id, userId);
    await this.repository.delete({ where: { id } });
  }

  public async readMessage(id: number, userId: number) {
    await this.userService.get(userId);
    await this.get(id, userId);
    const updated = await this.repository.update({
      where: { id },
      data: {
        isRead: true,
      },
    });
    return updated;
  }

  public async readMessageAll(userId: number): Promise<number> {
    await this.userService.get(userId);
    return this.repository.markAllMessagesAsRead(userId);
  }

  public async deleteAllMessagesForUser(userId: number): Promise<number> {
    await this.userService.get(userId);
    return this.repository.deleteAllMessagesForUser(userId);
  }

  private async get(id: number, userId: number) {
    const find = await this.repository.find({ id, userId });
    if (!find) {
      throw new BusinessRuleException('Mensagem do usuário não encontrada');
    }
    return find;
  }
}
