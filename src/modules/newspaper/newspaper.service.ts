import { BusinessRuleException } from '@/helpers/error/BusinessRuleException';
import { CreateNewspaperDto } from './dto/create-newspaper.dto';
import { Injectable } from '@nestjs/common';
import { NewspaperRepository } from './newspaper.repository';
import { ResponseMessage } from '@/helpers/ResponseMessage';
import { UpdateNewspaperDto } from './dto/update-newspaper.dto';

@Injectable()
export class NewspaperService {
  constructor(private repository: NewspaperRepository) {}

  public async create(dto: CreateNewspaperDto) {
    const save = await this.repository.save({
      data: dto,
    });
    return save;
  }

  public async get(id: number) {
    const find = await this.repository.find({ id });
    if (!find) {
      throw new BusinessRuleException('Notícia não encontrada');
    }
    return find;
  }

  public async getAll() {
    const findAll = await this.repository.findAll({
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          id: 'desc',
        },
      ],
      take: 10,
    });
    return findAll;
  }

  public async update(dto: UpdateNewspaperDto) {
    await this.get(dto.id);
    const updatedAvatar = await this.repository.update({
      where: { id: dto.id },
      data: dto,
    });
    return updatedAvatar;
  }

  public async exclude(id: number) {
    await this.get(id);
    await this.repository.delete({ where: { id } });
    return new ResponseMessage('Notícia excluída com sucesso');
  }
}
