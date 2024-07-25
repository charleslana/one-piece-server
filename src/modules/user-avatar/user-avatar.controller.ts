import { AuthGuard } from '../auth/auth.guard';
import { Body, Controller, Get, Logger, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserAvatarDto } from './dto/create-user-avatar.dto';
import { FindOneParams } from '../find-one.params';
import { GetUserAvatarDto } from './dto/get-user-avatar.dto';
import { plainToInstance } from 'class-transformer';
import { Request as RequestExpress } from 'express';
import { RoleEnum } from '@prisma/client';
import { RoleGuard } from '../auth/role.guard';
import { UserAvatarService } from './user-avatar.service';

@Controller('avatar')
export class UserAvatarController {
  constructor(private readonly avatarService: UserAvatarService) {}

  private readonly logger = new Logger(UserAvatarController.name);

  @UseGuards(AuthGuard, new RoleGuard([RoleEnum.admin]))
  @Post()
  public async createAvatar(
    @Body() createAvatarDto: CreateUserAvatarDto,
    @Request() req: RequestExpress
  ) {
    this.logger.log(`createAvatar: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(createAvatarDto)}`);
    const user = await this.avatarService.create(createAvatarDto);
    return plainToInstance(GetUserAvatarDto, user);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  public async getAvatar(@Param() params: FindOneParams, @Request() req: RequestExpress) {
    this.logger.log(`getAvatar: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(params)}`);
    this.logger.log(`Data sent: ${JSON.stringify(req.user.sub)}`);
    const { id } = params;
    const avatar = await this.avatarService.get(id, req.user.sub);
    return plainToInstance(GetUserAvatarDto, avatar);
  }

  @UseGuards(AuthGuard)
  @Get()
  public async getAvatars(@Request() req: RequestExpress): Promise<GetUserAvatarDto[]> {
    this.logger.log(`getAvatars: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(req.user.sub)}`);
    const avatars = await this.avatarService.getAll(req.user.sub);
    return plainToInstance(GetUserAvatarDto, avatars);
  }
}
