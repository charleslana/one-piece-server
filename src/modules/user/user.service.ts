import { BusinessRuleException } from '@/helpers/error/BusinessRuleException';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { Injectable } from '@nestjs/common';
import { PageDto } from '@/dto/page.dto';
import { ResponseMessage } from '@/helpers/ResponseMessage';
import { UpdateUserPasswordDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

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
    return find;
  }

  public async getAll() {
    const findAll = await this.repository.findAll({});
    return findAll;
  }

  public async getAllPaginated(page: PageDto, dto?: FilterUserDto) {
    const findAllPaginated = await this.repository.findAllPaginated({ page, email: dto.email });
    return findAllPaginated;
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
}
