import { BusinessRuleException } from '@/helpers/error/BusinessRuleException';
import { CreateUserNewspaperDto } from './dto/create-user-newspaper.dto';
import { Injectable } from '@nestjs/common';
import { NewspaperService } from '../newspaper/newspaper.service';
import { UserNewspaperRepository } from './user-newspaper.repository';
import { UserService } from '../user/user.service';

@Injectable()
export class UserNewspaperService {
  constructor(
    private repository: UserNewspaperRepository,
    private userService: UserService,
    private newspaperService: NewspaperService
  ) {}

  public async create(dto: CreateUserNewspaperDto) {
    const user = await this.userService.get(dto.userId);
    const newspaper = await this.newspaperService.get(dto.newspaperId);
    const userNewspaper = await this.repository.findByUserIdAndNewspaperId(
      dto.userId,
      dto.newspaperId
    );
    if (userNewspaper) {
      if (dto.like) {
        return this.likeNewspaper(userNewspaper.id);
      }
      return this.dislikeNewspaper(userNewspaper.id);
    }
    const save = await this.repository.save({
      data: {
        like: dto.like,
        user: {
          connect: { id: user.id },
        },
        newspaper: {
          connect: newspaper,
        },
      },
    });
    return save;
  }

  public async getAll(id: number) {
    const findAll = await this.repository.findAll({
      where: {
        newspaperId: id,
      },
    });
    return findAll;
  }

  public async exclude(id: number, userId: number) {
    await this.userService.get(userId);
    await this.get(id, userId);
    await this.repository.delete({ where: { id } });
  }

  private async get(id: number, userId: number) {
    const find = await this.repository.find({ id, userId });
    if (!find) {
      throw new BusinessRuleException('Notícia do usuário não encontrada');
    }
    return find;
  }

  private async likeNewspaper(id: number) {
    const updated = await this.repository.update({
      where: { id },
      data: {
        like: true,
      },
    });
    return updated;
  }

  private async dislikeNewspaper(id: number) {
    const updated = await this.repository.update({
      where: { id },
      data: {
        like: false,
      },
    });
    return updated;
  }
}
