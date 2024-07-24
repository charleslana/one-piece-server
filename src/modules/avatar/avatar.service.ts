import { AvatarRepository } from './avatar.repository';
import { BusinessRuleException } from '@/helpers/error/BusinessRuleException';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { Injectable } from '@nestjs/common';
import { UserCharacterService } from '../user-character/user-character.service';

@Injectable()
export class AvatarService {
  constructor(
    private repository: AvatarRepository,
    private userCharacterService: UserCharacterService
  ) {}

  public async create(dto: CreateAvatarDto) {
    const userCharacter = await this.userCharacterService.get(dto.userId);
    const exists = await this.repository.existsByAvatarAndUserCharacterId(
      dto.image,
      userCharacter.id
    );
    if (exists) {
      throw new BusinessRuleException('Já existe o avatar cadastrado');
    }
    const user = await this.repository.save({
      data: {
        image: dto.image,
        userCharacter: {
          connect: {
            id: userCharacter.id,
          },
        },
      },
    });
    return user;
  }

  public async get(id: number, userId: number) {
    const userCharacter = await this.userCharacterService.get(userId);
    const find = await this.repository.find({ id, userCharacter });
    if (!find) {
      throw new BusinessRuleException('Avatar não encontrado');
    }
    return find;
  }

  public async getAll(userId: number) {
    const userCharacter = await this.userCharacterService.get(userId);
    const findAll = await this.repository.findAll({ where: { userCharacterId: userCharacter.id } });
    return findAll;
  }
}
