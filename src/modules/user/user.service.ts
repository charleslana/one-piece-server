import { BusinessRuleException } from '@/helpers/error/BusinessRuleException';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PageDto } from '@/dto/page.dto';
import { ResponseMessage } from '@/helpers/ResponseMessage';
import { UpdateUserDto, UpdateUserPasswordDto } from './dto/update-user.dto';
import { UserAvatarService } from '../user-avatar/user-avatar.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
    @Inject(forwardRef(() => UserAvatarService))
    private userAvatarService: UserAvatarService
  ) {}

  public async create(dto: CreateUserDto) {
    const exists = await this.repository.findByEmail(dto.email);
    if (exists) {
      throw new BusinessRuleException('O e-mail do usuário já existe');
    }
    dto.password = await dto.hashPassword(dto.password);
    const user = await this.repository.save({
      data: dto,
    });
    return user;
  }

  public async get(id: number) {
    const find = await this.repository.find({ id });
    if (!find) {
      throw new BusinessRuleException('Usuário não encontrado');
    }
    const selectedAvatar = find.avatars.find((avatar) => avatar.selected === true);
    return {
      ...find,
      avatar: selectedAvatar.image,
    };
  }

  public async getAll() {
    const findAll = await this.repository.findAll({});
    return findAll;
  }

  public async filterUsersPaginated(page: PageDto, dto?: FilterUserDto) {
    const findAllPaginated = await this.repository.findAllPaginatedAndFilter({
      page,
      name: dto.name,
    });
    const filteredResults = findAllPaginated.results.map((user) => {
      const selectedAvatar = user.avatars.find((avatar) => avatar.selected === true);
      return {
        ...user,
        avatar: selectedAvatar.image,
      };
    });
    return {
      ...findAllPaginated,
      results: filteredResults,
    };
  }

  public async exclude(id: number) {
    await this.get(id);
    await this.repository.delete({ where: { id } });
    return new ResponseMessage('Usuário deletado com sucesso');
  }

  public async updateUserPassword(dto: UpdateUserPasswordDto) {
    const existingUser = await this.get(dto.id);
    const isPasswordValid = await dto.decryptPassword(dto.currentPassword, existingUser.password);
    if (!isPasswordValid) {
      throw new BusinessRuleException('Senha do usuário atual inválida');
    }
    const password = await dto.hashPassword(dto.newPassword);
    const user = await this.repository.update({
      data: {
        password,
      },
      where: {
        id: dto.id,
      },
    });
    return user;
  }

  public async getUserByEmail(email: string) {
    const user = await this.repository.findByEmail(email);
    return user;
  }

  public async updateUserCharacter(dto: UpdateUserDto) {
    const existingUser = await this.get(dto.userId);
    if (existingUser.name) {
      throw new BusinessRuleException('Você já atualizou os dados do personagem');
    }
    if (dto.name) {
      const existingUserWithName = await this.repository.findByName(dto.name);
      if (existingUserWithName && existingUserWithName.id !== existingUser.id) {
        throw new BusinessRuleException('Nome de personagem do usuário já existe');
      }
    }
    await this.userAvatarService.updateAvatar(dto.avatarId, dto.userId);
    const userCharacter = await this.repository.update({
      data: {
        name: dto.name,
        faction: dto.faction,
        breed: dto.breed,
        sea: dto.sea,
        characterClass: dto.characterClass,
      },
      where: {
        id: dto.userId,
      },
    });
    return userCharacter;
  }
}
