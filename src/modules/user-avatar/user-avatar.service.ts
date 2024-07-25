import { BusinessRuleException } from '@/helpers/error/BusinessRuleException';
import { CreateUserAvatarDto } from './dto/create-user-avatar.dto';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserAvatarRepository } from './user-avatar.repository';
import { UserService } from '../user/user.service';

@Injectable()
export class UserAvatarService {
  constructor(
    private repository: UserAvatarRepository,
    @Inject(forwardRef(() => UserService))
    private userService: UserService
  ) {}

  public async create(dto: CreateUserAvatarDto) {
    const user = await this.userService.get(dto.userId);
    const exists = await this.repository.existsByAvatarAndUserCharacterId(dto.image, user.id);
    if (exists) {
      throw new BusinessRuleException('Já existe o avatar cadastrado');
    }
    const save = await this.repository.save({
      data: {
        image: dto.image,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return save;
  }

  public async get(id: number, userId: number) {
    const user = await this.userService.get(userId);
    const find = await this.repository.find({ id, user });
    if (!find) {
      throw new BusinessRuleException('Avatar não encontrado');
    }
    return find;
  }

  public async getAll(userId: number) {
    const user = await this.userService.get(userId);
    const findAll = await this.repository.findAll({ where: { user } });
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
