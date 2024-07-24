import { AvatarRepository } from './avatar.repository';
import { BusinessRuleException } from '@/helpers/error/BusinessRuleException';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserCharacterService } from '../user-character/user-character.service';

@Injectable()
export class AvatarService {
  constructor(
    private repository: AvatarRepository,
    @Inject(forwardRef(() => UserCharacterService))
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

  public async updateAvatar(avatarId: number, userId: number) {
    await this.get(avatarId, userId);
    const avatars = await this.getAll(userId);
    const currentSelectedAvatar = avatars.find((avatar) => avatar.selected);
    if (currentSelectedAvatar && currentSelectedAvatar.id !== avatarId) {
      await this.repository.update({
        where: { id: currentSelectedAvatar.id },
        data: { selected: false },
      });
    }
    const updatedAvatar = await this.repository.update({
      data: { selected: true },
      where: { id: avatarId },
    });
    return updatedAvatar;
  }
}
