import { AvatarService } from '../avatar/avatar.service';
import { BusinessRuleException } from '@/helpers/error/BusinessRuleException';
import { FilterUserCharacterDto } from './dto/filter-user-character.dto';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PageDto } from '@/dto/page.dto';
import { UpdateUserCharacterDto } from './dto/update-user-character.dto';
import { UserCharacterRepository } from './user-character.repository';
import { UserService } from '../user/user.service';

@Injectable()
export class UserCharacterService {
  constructor(
    private repository: UserCharacterRepository,
    private userService: UserService,
    @Inject(forwardRef(() => AvatarService))
    private avatarService: AvatarService
  ) {}

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
    const user = await this.userService.get(dto.userId);
    const existingUser = await this.get(user.userCharacterId);
    if (existingUser.name) {
      throw new BusinessRuleException('Você já atualizou os dados do personagem');
    }
    if (dto.name) {
      const existingUserWithName = await this.repository.findByName(dto.name);
      if (existingUserWithName && existingUserWithName.id !== existingUser.id) {
        throw new BusinessRuleException('Nome de personagem do usuário já existe');
      }
    }
    const userCharacter = await this.repository.update({
      data: {
        name: dto.name,
        faction: dto.faction,
        sea: dto.sea,
        class: dto.class,
      },
      where: {
        id: dto.userId,
      },
    });
    await this.avatarService.updateAvatar(dto.avatarId, dto.userId);
    return userCharacter;
  }
}
