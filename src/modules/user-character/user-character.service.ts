import { BusinessRuleException } from '@/helpers/error/BusinessRuleException';
import { FilterUserCharacterDto } from './dto/filter-user-character.dto';
import { Injectable } from '@nestjs/common';
import { PageDto } from '@/dto/page.dto';
import { UpdateUserCharacterDto } from './dto/update-user-character.dto';
import { UserCharacterRepository } from './user-character.repository';

@Injectable()
export class UserCharacterService {
  constructor(private repository: UserCharacterRepository) {}

  public async get(id: number) {
    const find = await this.repository.find({ id });
    if (!find) {
      throw new BusinessRuleException('Usuário do personagem não encontrado');
    }
    return find;
  }

  public async getAllPaginated(page: PageDto, dto?: FilterUserCharacterDto) {
    const findAllPaginated = await this.repository.findAllPaginated({ page, name: dto.name });
    return findAllPaginated;
  }

  public async updateUserCharacter(dto: UpdateUserCharacterDto) {
    const existingUser = await this.get(dto.id);
    if (existingUser.name) {
      throw new BusinessRuleException('Você já atualizou os dados do personagem');
    }
    if (dto.name) {
      const existingUserWithName = await this.repository.findByName(dto.name);
      if (existingUserWithName && existingUserWithName.id !== existingUser.id) {
        throw new BusinessRuleException('Nome de personagem do usuário já existe');
      }
    }
    const user = await this.repository.update({
      data: dto,
      where: {
        id: dto.id,
      },
    });
    return user;
  }
}
